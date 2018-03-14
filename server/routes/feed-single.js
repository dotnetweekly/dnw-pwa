const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	try {
		const singleParts = patterns.singleRegex.exec(req.originalUrl);

		if (!singleParts || singleParts.length < 3) {
			console.log(singleParts, req.originalUrl);
			throw 'Feed single - route wrong syntax';
			return;
		}

		axios
			.get(`${config.apiDomain}links/${singleParts[2]}?feed=rss`, { timeout: 7000 })
			.then(feedResponse => {
				if (!feedResponse.data) {
					return res.redirect(301, `${config.client}`);
				}
				res.header('Accept', 'application/rss+xml');
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
