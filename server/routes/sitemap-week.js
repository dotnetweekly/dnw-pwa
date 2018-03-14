const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	try {
		const weekParts = patterns.weekSitemapRegex.exec(req.originalUrl);

		if (!weekParts || weekParts.length < 3) {
			console.log(req.originalUrl);
			next();
			throw 'Sitemap week - route wrong syntax';
		}

		axios
			.get(`${config.apiDomain}sitemap/week/${weekParts[1]}/${weekParts[2]}`, { timeout: 7000 })
			.then(feedResponse => {
				if (!feedResponse.data) {
					return res.redirect(301, `${config.client}`);
				}
				res.header('Content-Type', 'application/xml');
				microCache.set(req.originalUrl, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			})
			.catch(err => {
				console.log(err);
				next();
				throw err;
			});
	} catch (error) {
		next();
	}
};

module.exports = handler;
