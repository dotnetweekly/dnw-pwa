const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	try {
		if (req.originalUrl === '/week/undefined/year/undefined/feed') {
			return res.redirect(301, `${config.client}feed`);
		}

		const hit = microCache.get(req.originalUrl);
		if (hit) {
			console.log('from cache: ', req.originalUrl);
			if (hit.type === 'xml') {
				res.header('Content-Type', 'application/xml');
			}
			return res.end(hit.data);
		}

		const weekParts = patterns.weekRegex.exec(req.originalUrl);

		if (!weekParts || weekParts.length < 3) {
			console.log(weekParts, req.originalUrl);
			next();
			throw 'Feed week - route wrong syntax';
		}

		axios
			.get(`${config.apiDomain}links?week=${weekParts[1]}&year=${weekParts[2]}&feed=rss`, { timeout: 7000 })
			.then(feedResponse => {
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
