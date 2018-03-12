const axios = require('axios');
const config = require('../../app.config');

const handler = function(req, res, next) {
	let legacyNewsletter = /\?w=(\d*)&y=(\d*)$/.exec(req.originalUrl);

	if (!legacyNewsletter || legacyNewsletter.length < 3) {
		legacyNewsletter = /\?week=(\d*)&year=(\d*)$/.exec(req.originalUrl);
		if (!legacyNewsletter || legacyNewsletter.length < 3) {
			console.log(req.originalUrl);
			throw 'Newsletter legacy - route wrong syntax';
		}
	}

	res.redirect(
		301,
		`${config.newsletterDomain}issues/${parseInt(legacyNewsletter[2])}/${parseInt(legacyNewsletter[1])}`
	);
};

module.exports = handler;
