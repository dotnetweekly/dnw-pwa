const axios = require('axios');
const config = require('../../app.config');
const cache = require('../cache');

const handler = function(req, res, next) {
	axios
		.get(`${config.apiDomain}sitemap`, { timeout: 7000 })
		.then(feedResponse => {
			res.header('Content-Type', 'application/xml');
			cache.set(req.originalUrl, { type: 'xml', data: feedResponse.data });
			res.end(feedResponse.data);
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

module.exports = handler;
