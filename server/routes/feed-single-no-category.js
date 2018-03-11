const axios = require('axios');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');
const legacyRedirects = require('../legacyRedirects.json');

const handler = function(req, res, next) {
	const singleParts = patterns.singleRegexNoCategory.exec(req.originalUrl);

	if (!singleParts || singleParts.length < 2) {
		throw 'Sitemap route wrong syntax';
	}

	const indexOfLegacyFeed = legacyRedirects.oldLinks.indexOf(`/${singleParts[1].replace(/\/$/g, '')}`);
	if (indexOfLegacyFeed && indexOfLegacyFeed != -1) {
		res.redirect(
			301,
			`${config.client.replace(/^\/|\/$/g, '')}${legacyRedirects.newLinks[indexOfLegacyFeed]}/feed`
		);
	} else {
		throw 'Sitemap route wrong syntax';
	}
};

module.exports = handler;
