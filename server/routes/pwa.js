const fs = require("fs");
const path = require("path");
const serialize = require("serialize-javascript");
var zlib = require("zlib");

const app = require("../expressApp");
const config = require("../../app.config");
const microCache = require("../cache");
const seoOptimize = require("../seo");
const legacyRedirects = require("../legacyRedirects");

const createBundleRenderer = require("vue-server-renderer")
  .createBundleRenderer;
const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === "production";

// parse index.html template
const indexHTML = (() => {
  let template = "";
  if (isProd) {
    template = fs.readFileSync(
      resolve("../../dist/assets/index.html"),
      "utf-8"
    );
  } else {
    template = fs.readFileSync(resolve("../../index.html"), "utf-8");
  }
  return template;
})();

function createRenderer(bundle) {
  return createBundleRenderer(bundle);
}

let renderer;
if (isProd) {
  const bundlePath = resolve("../../dist/server/main.js");
  renderer = createRenderer(fs.readFileSync(bundlePath, "utf-8"));
} else {
  require("../../build/dev-server")(app, bundle => {
    renderer = createRenderer(bundle);
  });
}

const handler = function(req, res) {
  try {
    const reqUrl = req.originalUrl;
    const context = { url: reqUrl };
    const isJSONTrue = { isJSON: true };
    const indexOfLegacy = legacyRedirects.oldLinks.indexOf(
      reqUrl.replace(/\/$/g, "")
    );

    // if (reqUrl.indexOf('well-known/acme-challenge') !== -1) {
    // 	return res.end(reqUrl.split('acme-challenge/')[1] + '.<key here>');
    // }

    if (indexOfLegacy !== -1) {
      return res.redirect(
        301,
        `${config.client.replace(/^\/|\/$/g, "")}${
          legacyRedirects.newLinks[indexOfLegacy]
        }`
      );
    }

    if (!renderer) {
      return res.end("waiting for compilation... refresh in a moment.");
    }

    const hit = microCache.get(reqUrl);
    if (hit) {
      console.log("from cache: ", req.originalUrl);
      if (hit.type === "xml") {
        res.header("Content-Type", "application/xml");
      }
      zlib.deflate(hit.data, function(err, buffer) {
        if (err) throw err;

        res.header("Content-Encoding", "deflate");
        res.end(buffer);
      });
      return;
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      html = indexHTML.replace('<div id="app"></div>', html);
      html = seoOptimize(html, req, context.initialState);
      html = html.replace(
        '<meta name="vue-state" />',
        `<script>window.__INITIAL_STATE__=${serialize(
          context.initialState,
          isJSONTrue
        )}</script>`
      );
      res.setHeader("Content-Length", Buffer.byteLength(html));
      microCache.set(reqUrl, { type: "html", data: html });
      /*zlib.deflate(minifiedHtml, function(err, buffer) {
        if (err) throw err;

        res.header("Content-Encoding", "deflate");
        res.end(buffer);
      });*/
      res.end(html);
      // res.end();
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = handler;
