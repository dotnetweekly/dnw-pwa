const config = require('../../app.config');

const feedQueryRedirect = function(req, res, next) {
	try {
		const feedEnding = /(.*?)\/$/;
		const queryParts = feedEnding.exec(req.originalUrl);

		if (req.originalUrl === '/' || req.originalUrl === '') {
			next();
			return;
		}

		if (queryParts && queryParts.length > 1) {
			res.redirect(301, `${config.client.replace(/\/$/, '')}${queryParts[1]}`);
		} else {
			next();
		}
	} catch (error) {
		next();
	}
};

module.exports = feedQueryRedirect;
