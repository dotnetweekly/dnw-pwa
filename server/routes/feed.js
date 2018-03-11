const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');

const handler = function(req, res, next) {
	axios
		.get(`${config.apiDomain}links?feed=rss`, { timeout: 7000 })
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
