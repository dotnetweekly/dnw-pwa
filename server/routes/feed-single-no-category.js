const config = require("../../app.config");
const patterns = require("./patterns");
const legacyRedirects = require("../legacyRedirects.json");

const handler = function(req, res, next) {
  try {
    const singleParts = patterns.singleRegexNoCategory.exec(req.originalUrl);

    if (!singleParts || singleParts.length < 2) {
      console.log(singleParts, req.originalUrl);
      throw "Feed single no category - route wrong syntax";
    }

    const indexOfLegacyFeed = legacyRedirects.oldLinks.indexOf(
      `/${singleParts[1].replace(/\/$/g, "")}`
    );
    if (indexOfLegacyFeed && indexOfLegacyFeed != -1) {
      res.redirect(
        301,
        `${config.client.replace(/^\/|\/$/g, "")}${
          legacyRedirects.newLinks[indexOfLegacyFeed]
        }/feed`
      );
    } else {
      console.log(req.originalUrl);
      next();
      throw "Feed single no legacy found -Sitemap route wrong syntax";
    }
  } catch (error) {
    next();
  }
};

module.exports = handler;
