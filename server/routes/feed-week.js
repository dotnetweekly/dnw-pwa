const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	const weekParts = patterns.weekRegex.exec(req.originalUrl);

	if (!weekParts || weekParts.length < 3) {
		console.log(weekParts, req.originalUrl);
		throw 'Feed week - route wrong syntax';
	}

	axios
		.get(`${config.apiDomain}links?week=${weekParts[1]}&year=${weekParts[2]}&feed=rss`, { timeout: 7000 })
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
