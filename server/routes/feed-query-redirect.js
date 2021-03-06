const config = require("../../app.config");

const feedQueryRedirect = function(req, res, next) {
  try {
    const feedEnding = /(.*)\?feed=rss$/;
    const queryParts = feedEnding.exec(req.originalUrl);

    if (queryParts && queryParts.length > 1) {
      res.redirect(
        301,
        `${config.client.replace(/\/$/, "")}${queryParts[1].replace(
          /\/$/,
          ""
        )}/feed`
      );
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

module.exports = feedQueryRedirect;
