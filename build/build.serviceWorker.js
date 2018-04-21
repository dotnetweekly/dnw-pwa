"use strict";

const path = require("path");
const fs = require("fs-extra");
const md5 = require("md5");
const recursive = require("recursive-readdir");
const _exec = require("child_process").exec;
const config = require(path.resolve(__dirname, "../app.config.js"));
const distFolder = "dist/";
const dirPath = path.resolve(__dirname, "../" + distFolder);

const promisify = (ctx, func = ctx) => (...args) => {
  return new Promise((resolve, reject) => {
    func.apply(ctx, [
      ...args,
      (err, result) => (err ? reject(err) : resolve(result))
    ]);
  });
};

const excludedFiles = [
  "([\\/|\\\\]server[\\/|\\\\].*)",
  "([\\/|\\\\]server\\.js)",
  "([\\/|\\\\]web\\.config)"
];
var excludedFilesRegExp = new RegExp(excludedFiles.join("|"), "gi");
var self = this;
self.assetFiles = [];
self.assetCacheHash = "";

const generateAssetHash = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getAllAssets().then(assetFiles => {
        console.log(assetFiles);
        self.assetFiles = assetFiles;
        const indexIndex = self.assetFiles.indexOf("/index.html");
        if (indexIndex > -1) {
          self.assetFiles[indexIndex] = "/assets/index.html";
        }
        self.assetCacheHash = md5(self.assetFiles.join(""));
        resolve();
      });
    }, 100);
  });
};

const getAllAssets = () => {
  return new Promise((resolve, reject) => {
    var assetFiles = [];
    recursive(dirPath, (err, files) => {
      files.forEach(file => {
        var fileName = file.replace(dirPath, "");
        if (fileName.match(excludedFilesRegExp)) {
          return;
        }
        assetFiles.push(getUrlPath(file));
      });
      resolve(assetFiles);
    });
  });
};

const getUrlPath = str => {
  return str
    .replace(dirPath, "")
    .replace(/\\/gi, "/")
    .replace(distFolder, "");
};

const generateSwConfigFile = () => {
  return new Promise((resolve, reject) => {
    var swConfigFilename = "sw_config_" + self.assetCacheHash + ".js";
    fs.outputFile(
      dirPath + "/" + swConfigFilename,
      "var config = " +
        JSON.stringify({
          assets: self.assetFiles.concat("/offline-redirect"),
          paths: { client: config.client },
          cacheNames: { assetCache: `vwpCacheAsset-${self.assetCacheHash}` }
        }),
      () => {
        resolve(swConfigFilename);
      }
    );
  });
};

const copyServiceWorker = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, "../src/service-worker.js"),
      "utf-8",
      function(err, data) {
        fs.writeFile(dirPath + "/service-worker.js", data, "utf8", function() {
          resolve();
        });
      }
    );
  });
};

const serviceWorker = () => {
  generateSwConfigFile().then(swConfigFilename => {
    fs.readFile(dirPath + "/service-worker.js", "utf-8", function(err, data) {
      data = data
        .replace("sw_config.js", swConfigFilename)
        .replace("{{assetCacheHash}}", self.assetCacheHash);
      fs.writeFile(dirPath + "/service-worker.js", data, "utf8");
    });
  });
};

const manifest = () => {
  fs.copySync(
    path.resolve(__dirname, "../src/assets/manifest.json"),
    dirPath + "/assets/manifest.json"
  );
  fs.readFile(dirPath + "/assets/manifest.json", "utf-8", function(err, data) {
    data = data.replace("${config.appBgColor}", config.appBgColor);
    data = data.replace("${config.appDescription}", config.appDescription);
    data = data.replace("${config.appIcon}", config.client + config.appIcon);
    data = data.replace(
      "${config.appIconLarge}",
      config.client + config.appIconLarge
    );
    data = data.replace("${config.appTitle}", config.appTitle);
    data = data.replace("${config.appTitleShort}", config.appTitleShort);
    data = data.replace("${config.appThemeColor}", config.appThemeColor);
    fs.writeFile(dirPath + "/assets/manifest.json", data, "utf8");
  });
};

const cleanIndex = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dirPath + "/index.html", "utf-8", function(err, data) {
      // fs.unlink(dirPath + "/assets/styles.css");
      data = data.replace(
        /<link(.*?)href=\"\/assets\/styles\.css\"(.*?)>/gim,
        ""
      );
      data = data.replace('<script src="/assets/js/vendor.js"></script>', "");
      data = data.replace('<script src="/assets/js/app.js"></script>', "");
      data = data.replace(
        /type="text\/javascript"/gim,
        ' type="text/javascript"'
      );
      data = data.replace(
        /rel="stylesheet"/gim,
        'media="all" rel="stylesheet"'
      );
      fs.writeFile(dirPath + "/assets/index.html", data, "utf8");
      fs.unlink(dirPath + "/index.html");

      _exec(
        `cp -R ${path.resolve(
          __dirname,
          "../src/assets/fontello/"
        )} ${path.resolve(__dirname, "../dist/assets/")}`
      );
      resolve();
    });
    console.log("Index Cleaned");
  });
};

const purifycss = () => {
  return new Promise(resolve => {
    const styleAsset = self.assetFiles.filter(asset => {
      return asset.match(/\/assets\/styles\.(.*?)\.css$/);
    })[0];
    // const appAsset = self.assetFiles.filter(asset => {
    //   return asset.match(/\/assets\/js\/app\.(.*?)\.js$/);
    // })[0];

    const styleData = fs.readFileSync(`${dirPath}${styleAsset}`, "utf-8");
    let indexData = fs.readFileSync(dirPath + "/assets/index.html", "utf-8");

    indexData = indexData.replace(
      `<link href="${styleAsset}" media="all" rel="stylesheet">`,
      `<style>${styleData}</style>`
    );
    fs.writeFile(dirPath + "/assets/index.html", indexData, "utf8");
    fs.unlink(`${dirPath}${styleAsset}`);
    resolve();
  });
};

const execSW = () => {
  cleanIndex()
    .then(() => generateAssetHash())
    .then(() => copyServiceWorker())
    .then(() => {
      serviceWorker();
      manifest();
      return purifycss();
    });
};

exports.execSW = execSW;
