const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	const singleParts = patterns.singleRegex.exec(req.originalUrl);

	if (!singleParts || singleParts.length < 3) {
		console.log(req.originalUrl);
		throw 'Sitemap route wrong syntax';
		return;
	}

	axios
		.get(`${config.apiDomain}links/${singleParts[2]}?feed=rss`, { timeout: 7000 })
		.then(feedResponse => {
			res.header('Accept', 'application/rss+xml');
			microCache.set(req.originalUrl, { type: 'xml', data: feedResponse.data });
			res.end(feedResponse.data);
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

module.exports = handler;
