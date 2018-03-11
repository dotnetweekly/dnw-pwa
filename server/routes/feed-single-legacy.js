const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');

const handler = function(req, res, next) {
	const singleParts = patterns.singleRegexLegacy.exec(req.originalUrl);

	if (!singleParts || singleParts.length < 3) {
		console.log(singleParts, req.originalUrl);
		throw 'Feed single legacy route wrong syntax';
	}

	res.redirect(301, `${config.client.replace(/^\/|\/$/g, '')}/${singleParts[1]}/${singleParts[2]}/feed`);
};

module.exports = handler;
