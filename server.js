"use strict";

process.env.VUE_ENV = "server";
const isProd = (process.env.NODE_ENV === "production");
const fs = require("fs");
const path = require("path");
const resolve = file => path.resolve(__dirname, file);
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const serialize = require("serialize-javascript");
const LRU = require('lru-cache');
const createBundleRenderer = require("vue-server-renderer")
  .createBundleRenderer;

const seoOptimize = require("./seo");
const legacyRedirects = require("./legacyRedirects.json");
const config = require("./app.config");

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return true;
}

const cacheControl = function (req, res, next) {
  if (isProd) {
    res.header("Cache-Control", "public, max-age=86400, no-cache");
  } else {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  }
  next();
};

const strictTransportSecurity = function (req, res, next) {
  res.header(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
};

// parse index.html template
const indexHTML = (() => {
  let template = "";
  if (isProd) {
    template = fs.readFileSync(resolve("./dist/assets/index.html"), "utf-8");
  } else {
    template = fs.readFileSync(resolve("./index.html"), "utf-8");
  }
  return template;
})();

function createRenderer(bundle) {
  return createBundleRenderer(bundle);
}

const app = express();
app.disable("x-powered-by");
app.use(compression({ threshold: 0, filter: shouldCompress }));
app.use(strictTransportSecurity);
app.use(cacheControl);
app.use(allowCrossDomain);

if (isProd) {
  app.use("/", express.static(resolve("./dist")));
  app.use(favicon(path.resolve(__dirname, "./dist/favicon.ico")));
} else {
  app.use("/dist", express.static(resolve("./dist")));
  app.use("/assets", express.static(resolve("./src/assets")));
  app.use(favicon(path.resolve(__dirname, "src/assets/favicon.ico")));
}

let renderer;
if (isProd) {
  const bundlePath = resolve("./dist/server/main.js");
  renderer = createRenderer(fs.readFileSync(bundlePath, "utf-8"));
} else {
  require("./build/dev-server")(app, bundle => {
    renderer = createRenderer(bundle);
  });
}

const microCache = LRU({
  max: 100,
  maxAge: 5000 // Important: entries expires after 1 second.
})

app.get("*", (req, res) => {
  try {
    // if (req.url.indexOf('well-known/acme-challenge') !== -1) {
    //   res.end(req.url.split('acme-challenge/')[1] + '.UQRLb6O27XsehoDP4ZeZoe88R3H6jjlErH9H1x1YmGg');
    //   return;
    // }

    const indexOfLegacy = legacyRedirects.oldLinks.indexOf(req.url.replace(/\/$/g, ''));
    if (indexOfLegacy !== -1) {
      res.redirect(301, `${config.client.replace(/^\/|\/$/g, '')}${legacyRedirects.newLinks[indexOfLegacy]}`);
      return;
    }

    if (req.url.replace(/\/$/g, '') === "/page/2" || req.url.replace(/\/$/g, '') === "/page/3"){
      res.redirect(301, `${config.client}`);
      return;
    }

    if (!renderer) {
      return res.end("waiting for compilation... refresh in a moment.");
    }

    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (!isProd) {
          console.log(err);
        }
        return res.sendStatus(500);
      }
      html = indexHTML.replace('<div id="app"></div>', html);
      html = seoOptimize(html, req, context.initialState);
      html = html.replace(
        '<meta name="vue-state" />',
        `<script>window.__INITIAL_STATE__=${serialize(context.initialState, {
          isJSON: true
        })}</script>`
      );
      res.setHeader("Content-Length", Buffer.byteLength(html));
      res.write(html);
      res.end();
    });
  } catch(error) {
    console.log(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
