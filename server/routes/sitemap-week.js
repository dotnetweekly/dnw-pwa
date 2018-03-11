const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	const weekParts = patterns.weekSitemapRegex.exec(req.originalUrl);

	if (!weekParts || weekParts.length < 3) {
		console.log(req.originalUrl);
		throw 'Sitemap week - route wrong syntax';
		return;
	}

	axios
		.get(`${config.apiDomain}sitemap/week/${weekParts[1]}/${weekParts[2]}`, { timeout: 7000 })
		.then(feedResponse => {
			res.header('Content-Type', 'application/xml');
			microCache.set(req.originalUrl, { type: 'xml', data: feedResponse.data });
			res.end(feedResponse.data);
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

module.exports = handler;
