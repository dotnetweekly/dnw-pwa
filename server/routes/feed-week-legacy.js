const config = require("../../app.config");
const patterns = require("./patterns");

const handler = function(req, res, next) {
  try {
    const weekParts = patterns.weekRegexLegacy.exec(req.originalUrl);

    if (!weekParts || weekParts.length < 3) {
      console.log(weekParts, req.originalUrl);
      next();
      throw "Feed week legacy - route wrong syntax";
    }

    res.redirect(
      301,
      `${config.client.replace(/^\/|\/$/g, "")}/week/${weekParts[1]}/year/${
        weekParts[2]
      }/feed`
    );
  } catch (error) {
    next();
  }
};

module.exports = handler;
