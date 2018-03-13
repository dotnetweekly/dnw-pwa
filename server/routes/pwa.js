const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');
const serialize = require('serialize-javascript');

const app = require('../expressApp');
const config = require('../../app.config');
const microCache = require('../cache');
const patterns = require('./patterns');
const seoOptimize = require('../seo');
const legacyRedirects = require('../legacyRedirects');

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production';

// parse index.html template
const indexHTML = (() => {
	let template = '';
	if (isProd) {
		template = fs.readFileSync(resolve('../../dist/assets/index.html'), 'utf-8');
	} else {
		template = fs.readFileSync(resolve('../../index.html'), 'utf-8');
	}
	return template;
})();

function createRenderer(bundle) {
	return createBundleRenderer(bundle);
}

let renderer;
if (isProd) {
	const bundlePath = resolve('../../dist/server/main.js');
	renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
} else {
	require('../../build/dev-server')(app, bundle => {
		renderer = createRenderer(bundle);
	});
}

const handler = function(req, res, next) {
	try {
		const reqUrl = req.originalUrl;
		const context = { url: reqUrl };
		const isJSONTrue = { isJSON: true };
		const indexOfLegacy = legacyRedirects.oldLinks.indexOf(reqUrl.replace(/\/$/g, ''));

		if (indexOfLegacy !== -1) {
			return res.redirect(
				301,
				`${config.client.replace(/^\/|\/$/g, '')}${legacyRedirects.newLinks[indexOfLegacy]}`
			);
		}

		if (!renderer) {
			return res.end('waiting for compilation... refresh in a moment.');
		}

		const hit = microCache.get(reqUrl);
		if (hit) {
			if (hit.type === 'xml') {
				res.header('Content-Type', 'application/xml');
			}
			return res.end(hit.data);
		}

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
			microCache.set(reqUrl, { type: 'html', data: html });
			res.write(html);
			res.end();
		});
	} catch (error) {
		return res.sendStatus(500);
	}
};

module.exports = handler;
