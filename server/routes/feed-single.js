const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	try {
		const s = Date.now();
		const hit = microCache.get(req.originalUrl);
		if (hit) {
			console.log('from cache: ', req.originalUrl);
			if (hit.type === 'xml') {
				res.header('Content-Type', 'application/xml');
			}
			return res.end(hit.data);
		}

		const singleParts = patterns.singleRegex.exec(req.originalUrl);

		if (!singleParts || singleParts.length < 3) {
			console.log(singleParts, req.originalUrl);
			throw 'Feed single - route wrong syntax';
			return;
		}

		axios
			.get(`${config.apiDomain}links/${singleParts[2]}?feed=rss`, { timeout: 5000 })
			.then(feedResponse => {
				console.log(`data feed-single fetch: ${Date.now() - s}ms`);

				if (!feedResponse || !feedResponse.data) {
					return res.redirect(301, `${config.client}feed`);
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
