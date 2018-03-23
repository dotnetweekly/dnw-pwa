const config = require("../../app.config");
const patterns = require("./patterns");

const handler = function(req, res, next) {
  try {
    const singleParts = patterns.singleRegexLegacy.exec(req.originalUrl);
    if (!singleParts || singleParts.length < 3) {
      console.log(singleParts, req.originalUrl);
      next();
      throw "Feed single legacy route wrong syntax";
    }

    res.redirect(
      301,
      `${config.client.replace(/^\/|\/$/g, "")}/${singleParts[1]}/${
        singleParts[2]
      }/feed`
    );
  } catch (error) {
    next();
  }
};

module.exports = handler;
