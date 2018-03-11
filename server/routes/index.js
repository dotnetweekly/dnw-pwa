const express = require('express');
const router = express.Router();

const config = require('../../app.config');
const patterns = require('./patterns');

// Sitemaps
router.use('/sitemap.xml', require('./sitemap'));
router.use('/sitemap-weeks.xml', require('./sitemap-weeks'));
router.use(patterns.weekSitemapRegex, require('./sitemap-week'));

// Feeds
router.use(/^\/feed$/, require('./feed'));
router.use('/rss.xml', require('./feed'));
router.use('/rss.php', require('./feed'));
router.use(patterns.singleRegex, require('./feed-single'));
router.use(patterns.singleRegexLegacy, require('./feed-single-legacy'));
router.use(patterns.weekRegex, require('./feed-week'));
router.use(patterns.weekRegexLegacy, require('./feed-week-legacy'));
router.use(patterns.singleRegexNoCategory, require('./feed-single-no-category'));

// Redirects
router.use(patterns.newsletterLegacy, require('./newsletter-legacy'));
router.use('/contribute', (req, res, next) => {
	res.redirect(301, `${config.client}about`);
});
router.use('/page/2', (req, res, next) => {
	res.redirect(301, `${config.client}`);
});
router.use('/page/1', (req, res, next) => {
	res.redirect(301, `${config.client}`);
});
router.use('*', require('./pwa'));

module.exports = router;
