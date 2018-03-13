const urlParser = require('url');
const config = require('../app.config');

const routerMeta = [
	{
		id: 'about',
		match: /^\/about$/,
		title: 'dotNET Weekly | About',
		description: 'About dotNET Weekly'
	},
	{
		id: 'links',
		match: /(^(\/week\/(.*?)\/year\/(.*?))$)|(^\/$)/,
		title: '',
		description: '',
		rss: ''
	},
	{
		id: 'link',
		match: /^\/(.*?)\/(.*?).$/,
		title: '',
		description: '',
		rss: ''
	},
	{
		id: 'main',
		match: /^(.*?)$/,
		title: 'dotNET Weekly',
		description: 'A free weekly newsletter on .NET latest'
	}
];

function parseLink(url, routerMetaItem, state) {
	if (!state || !state.linkModule || !state.linkModule.link) {
		return;
	}
	routerMetaItem.rss = `${config.client}${state.linkModule.link.category}/${state.linkModule.link.slug}/feed`;
	routerMetaItem.title = state.linkModule.link.title;
	routerMetaItem.description = state.linkModule.link.content;

	return routerMetaItem;
}

function parseLinks(url, routerMetaItem, state) {
	if (
		!state ||
		!state.linksModule ||
		!state.linksModule.filter ||
		!state.linksModule.filter.dateWeek ||
		!state.linksModule.filter.dateYear
	) {
		return;
	}
	const week = state.linksModule.filter.dateWeek;
	const year = state.linksModule.filter.dateYear;
	const category = state.linksModule.filter.category || '';
	const dateRoute = week && year ? `week/${week}/year/${year}` : '';
	const dateTitle = week && year ? ` | Week ${week} Year ${year}` : '';

	routerMetaItem.rss = `${config.client}${dateRoute}/feed`;
	routerMetaItem.title = `dotNET Weekly${dateTitle}`;
	routerMetaItem.description = `A free weekly newsletter on .NET latest${dateTitle}`;

	var requestUrl = urlParser.parse(url);
	var requestPath = requestUrl.pathname;

	if (requestPath === '/' || requestPath === '') {
		routerMetaItem.title = `dotNET Weekly | A free weekly newsletter on .NET latest`;
		routerMetaItem.description = `A free weekly newsletter on .NET latest`;
		routerMetaItem.rss = `${config.client}feed`;
	}

	return routerMetaItem;
}

function getMeta(url, state) {
	try {
		if (!url || !state) {
			return;
		}

		for (var key = 0; key < routerMeta.length; key++) {
			if (url.match(routerMeta[key].match)) {
				if (routerMeta[key].id === 'link') {
					return parseLink(url, routerMeta[key], state);
				} else if (routerMeta[key].id === 'links') {
					return parseLinks(url, routerMeta[key], state);
				}
				return routerMeta[key];
			}
		}
	} catch (error) {
		return;
	}
}

module.exports = getMeta;
