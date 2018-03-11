const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	const weekParts = patterns.weekRegexLegacy.exec(req.originalUrl);

	if (!weekParts || weekParts.length < 3) {
		console.log(weekParts, req.originalUrl);
		throw 'Feed week legacy - route wrong syntax';
	}

	res.redirect(301, `${config.client.replace(/^\/|\/$/g, '')}/week/${weekParts[1]}/year/${weekParts[2]}/feed`);
};

module.exports = handler;
