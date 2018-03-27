process.env.VUE_ENV = "server";

const isProd = process.env.NODE_ENV === "production";

const instrumentationKey = process.env.INSTRUMENTATION_KEY || "";
let appInsights = require("applicationinsights");
if (isProd && instrumentationKey) {
  appInsights.setup(instrumentationKey).start();
}

const express = require("express");
const secure = require("express-force-https");
const path = require("path");
const compression = require("compression");
const force = require("express-force-domain");
const favicon = require("serve-favicon");
var expressStaticGzip = require("express-static-gzip");

const app = require("./expressApp");
const config = require("../app.config");
const routes = require("./routes");
const feedQueryRedirect = require("./routes/feed-query-redirect");
const trailingSlashRedirect = require("./routes/trailingSlashRedirect");

const resolve = file => path.resolve(__dirname, file);

const shouldCompress = function(req) {
  return true;

  /* if (req.headers["x-no-compression"]) {
    return false;
  }
  return true; */
};

const strictTransportSecurity = function(req, res, next) {
  res.header(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
};

const cacheControl = function(req, res, next) {
  if (isProd) {
    res.header("Cache-Control", "public, max-age=86400, no-cache");
  } else {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  }
  next();
};

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.disable("x-powered-by");
app.use(compression({ threshold: 0, filter: shouldCompress }));
app.use(strictTransportSecurity);
app.use(cacheControl);
app.use(allowCrossDomain);
app.use(trailingSlashRedirect);

if (isProd) {
  app.use(secure);
}
app.use(force(config.client.replace(/\/$/, "")));
app.use(feedQueryRedirect);

if (isProd) {
  app.use(
    "/",
    expressStaticGzip(resolve("../dist"), {
      enableBrotli: true
    })
  );
  app.use(favicon(resolve("../dist/favicon.ico")));
} else {
  app.use("/dist", express.static(resolve("../dist")));
  app.use("/assets", express.static(resolve("../src/assets")));
  app.use(favicon(resolve("../src/assets/favicon.ico")));
}

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send("Not Found");
});

app.use(function(err, req, res) {
  console.log(err);
  res.status(500).send("Server Error");
});

module.exports = app;
