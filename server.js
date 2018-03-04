'use strict';

process.env.VUE_ENV = 'server';
const isProd = process.env.NODE_ENV === 'production';
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const serialize = require('serialize-javascript');
const LRU = require('lru-cache');
const axios = require('axios');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const force = require('express-force-domain');

const seoOptimize = require('./seo');
const legacyRedirects = require('./legacyRedirects.json');
const config = require('./app.config');

const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
};

function shouldCompress(req, res) {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return true;
}

const cacheControl = function(req, res, next) {
	if (isProd) {
		res.header('Cache-Control', 'public, max-age=86400, no-cache');
	} else {
		res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	}
	next();
};

const strictTransportSecurity = function(req, res, next) {
	res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
	next();
};

// parse index.html template
const indexHTML = (() => {
	let template = '';
	if (isProd) {
		template = fs.readFileSync(resolve('./dist/assets/index.html'), 'utf-8');
	} else {
		template = fs.readFileSync(resolve('./index.html'), 'utf-8');
	}
	return template;
})();

function createRenderer(bundle) {
	return createBundleRenderer(bundle);
}

const app = express();
app.disable('x-powered-by');
app.use(compression({ threshold: 0, filter: shouldCompress }));
app.use(strictTransportSecurity);
app.use(cacheControl);
app.use(allowCrossDomain);

if (isProd) {
	app.use(force('https://www.dotnetweekly.com'));
}

if (isProd) {
	app.use('/', express.static(resolve('./dist')));
	app.use(favicon(path.resolve(__dirname, './dist/favicon.ico')));
} else {
	app.use('/dist', express.static(resolve('./dist')));
	app.use('/assets', express.static(resolve('./src/assets')));
	app.use(favicon(path.resolve(__dirname, 'src/assets/favicon.ico')));
}

let renderer;
if (isProd) {
	const bundlePath = resolve('./dist/server/main.js');
	renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
} else {
	require('./build/dev-server')(app, bundle => {
		renderer = createRenderer(bundle);
	});
}

const microCache = LRU({
	max: 1000,
	maxAge: 60000 // Important: entries expires after 1 second.
});

app.get('*', (req, res) => {
	try {
		// if (req.url.indexOf('well-known/acme-challenge') !== -1) {
		//   res.end(req.url.split('acme-challenge/')[1] + '.UQRLb6O27XsehoDP4ZeZoe88R3H6jjlErH9H1x1YmGg');
		//   return;
		// }

		const context = { url: req.url };
		const legacyNewsletter = req.url.match(/\/newsletter\/show\_newsletter\.php\?w=(.*?)&y=(.*?)$/);
		const indexOfLegacy = legacyRedirects.oldLinks.indexOf(req.url.replace(/\/$/g, ''));
		const isJSONTrue = { isJSON: true };
		const weekRegex = /\/week\/(\d*)\/year\/(\d*)((\/?\?feed=rss)|(\/rss\.xml))/gi;
		const weekRegexLegacy = /\/feed\/week\/(\d*)\/year\/(\d*)\/?/gi;
		const singleRegex = /\/(articles|books|libraries\-tools|events\-training|videos)\/(.*?)((\/?\?feed=rss)|(\/rss\.xml))/gi;
		const singleRegexLegacy = /\/feed\/(articles|books|libraries\-tools|events\-training|videos)\/(.*?)\/?$/gi;
		const weekSitemapRegex = /^\/sitemap-(.*?)-(.*?)\.xml$/gi;
		// if (!isProd) {
		//   if (req.url === "/service-worker.js") {
		//     res.setHeader('content-type', 'text/javascript');
		//     res.end(fs.readFileSync(path.resolve(__dirname, "src/service-worker.js")));
		//     return;
		//   }
		//   if (req.url === "/sw_config.js") {
		//     res.setHeader('content-type', 'text/javascript');
		//     res.end(fs.readFileSync(path.resolve(__dirname, "src/assets/sw-config.js")));
		//     return;
		//   }
		// }

		// if (isProd) {
		// 	if (!req.protocol.includes('https')) {
		// 		res.redirect('https://' + req.headers.host + req.url);
		// 		return;
		// 	}
		// }

		// if (req.url !== '/' && req.url.match(/(.*?)\/$/)) {
		// 	res.redirect(301, req.url.replace(/\/$/, ''));
		// 	return;
		// }

		const hit = microCache.get(req.url);
		if (hit) {
			if (hit.type === 'xml') {
				res.header('Content-Type', 'application/xml');
			}
			return res.end(hit.data);
		}

		if (req.url === '/sitemap.xml') {
			axios.get(`${config.apiDomain}sitemap`).then(feedResponse => {
				res.header('Content-Type', 'application/xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
			return;
		} else if (req.url === '/sitemap-weeks.xml') {
			axios.get(`${config.apiDomain}sitemap/weeks`).then(feedResponse => {
				res.header('Content-Type', 'application/xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
			return;
		} else if (req.url.match(weekSitemapRegex)) {
			const weekParts = weekSitemapRegex.exec(req.url);
			axios.get(`${config.apiDomain}sitemap/week/${weekParts[1]}/${weekParts[2]}`).then(feedResponse => {
				res.header('Content-Type', 'application/xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
			return;
		} else if (req.url === '/contribute/') {
			res.redirect(301, `${config.client}about`);
			return;
		} else if (req.url.replace(/\/$/g, '') == '/feed' || req.url == '/?feed=rss' || req.url == '/rss.xml') {
			axios.get(`${config.apiDomain}links?feed=rss`).then(feedResponse => {
				res.header('Accept', 'application/rss+xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
		} else if (req.url.match(weekRegex)) {
			const weekParts = weekRegex.exec(req.url);
			axios
				.get(`${config.apiDomain}links?week=${weekParts[1]}&year=${weekParts[2]}&feed=rss`)
				.then(feedResponse => {
					res.header('Accept', 'application/rss+xml');
					microCache.set(req.url, { type: 'xml', data: feedResponse.data });
					res.end(feedResponse.data);
				});
		} else if (req.url.match(weekRegexLegacy)) {
			const weekParts = weekRegexLegacy.exec(req.url);
			axios
				.get(`${config.apiDomain}links?week=${weekParts[1]}&year=${weekParts[2]}&feed=rss`)
				.then(feedResponse => {
					res.header('Accept', 'application/rss+xml');
					microCache.set(req.url, { type: 'xml', data: feedResponse.data });
					res.end(feedResponse.data);
				});
		} else if (req.url.match(singleRegex)) {
			const singleParts = singleRegex.exec(req.url);
			axios.get(`${config.apiDomain}links/${singleParts[2]}?feed=rss`).then(feedResponse => {
				res.header('Accept', 'application/rss+xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
		} else if (req.url.match(singleRegexLegacy)) {
			const singleParts = singleRegexLegacy.exec(req.url);
			axios.get(`${config.apiDomain}links/${singleParts[2]}?feed=rss`).then(feedResponse => {
				res.header('Accept', 'application/rss+xml');
				microCache.set(req.url, { type: 'xml', data: feedResponse.data });
				res.end(feedResponse.data);
			});
		} else if (legacyNewsletter) {
			res.redirect(
				301,
				`${config.newsletterDomain}issues/${parseInt(legacyNewsletter[2])}/${parseInt(legacyNewsletter[1])}`
			);
			return;
		} else if (indexOfLegacy !== -1) {
			res.redirect(301, `${config.client.replace(/^\/|\/$/g, '')}${legacyRedirects.newLinks[indexOfLegacy]}`);
			return;
		} else if (req.url.replace(/\/$/g, '') === '/page/2' || req.url.replace(/\/$/g, '') === '/page/3') {
			res.redirect(301, `${config.client}`);
			return;
		} else if (!renderer) {
			return res.end('waiting for compilation... refresh in a moment.');
		} else {
			renderer.renderToString(context, (err, html) => {
				if (err) {
					console.log(err);
					return res.sendStatus(500);
				}
				html = indexHTML.replace('<div id="app"></div>', html);
				html = seoOptimize(html, req, context.initialState);
				html = html.replace(
					'<meta name="vue-state" />',
					`<script>window.__INITIAL_STATE__=${serialize(context.initialState, isJSONTrue)}</script>`
				);
				res.setHeader('Content-Length', Buffer.byteLength(html));
				microCache.set(req.url, { type: 'html', data: html });
				res.write(html);
				res.end();
			});
		}
	} catch (error) {
		console.log(req.url);
		console.log(error);
		res.end('Service Error');
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
