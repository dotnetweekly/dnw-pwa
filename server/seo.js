const routerMeta = require('./router-meta');

function seoOptimize(html, req, state) {
	const url = req.originalUrl;

	let metadata = routerMeta(url, state) || {
		title: 'dotNET Weekly',
		description: 'A free weekly newsletter on .NET latest'
	};

	if (metadata.rss) {
		html = html.replace(
			/<meta name="rss-feed" \/>(<link (.*?) \/>)*/gim,
			`<meta name="rss-feed" /><link rel="alternate" type="application/rss+xml" title="${metadata.title}" href="${
				metadata.rss
			}" />`
		);
	}

	html = html.replace(
		/<meta name="description" content="(.*?)">/gim,
		`<meta name="description" content="${metadata.description}">`
	);
	html = html.replace(
		/<meta property="og:description" content="(.*?)">/gim,
		`<meta property="og:description" content="${metadata.description}">`
	);
	html = html.replace(
		/<meta property="og:title" content="(.*?)">/gim,
		`<meta property="og:title" content="${metadata.title}">`
	);
	html = html.replace(/<title>(.*?)<\/title>/gim, `<title>${metadata.title}</title>`);
	return html;
}

module.exports = seoOptimize;
