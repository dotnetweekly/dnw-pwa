const weekSitemapRegex = /^\/sitemap-(.*?)-(.*?)\.xml$/;

const weekRegex = /^\/week\/(\d*)\/year\/(\d*)\/?((feed\/?)|(\?feed=rss)|(rss\.xml))$/;
const weekRegexLegacy = /^\/feed\/week\/(\d*)\/year\/(\d*)\/?$/;

const singleRegex = /^\/(articles|books|libraries\-tools|events\-training|videos)\/(.*?)\/?((feed\/?)|(feed=rss)|(rss\.xml))$/;
const singleRegexNoCategory = /^\/(.*?)\/?((feed\/?)|(\?feed=rss)|(rss\.xml))$/;
const singleRegexLegacy = /^\/feed\/(articles|books|libraries\-tools|events\-training|videos)\/(.*?)\/?$/;

const newsletterLegacy = /^\/newsletter\/show\_newsletter\.php$/;

module.exports = {
	weekSitemapRegex,
	weekRegex,
	weekRegexLegacy,
	singleRegex,
	singleRegexNoCategory,
	singleRegexLegacy,
	newsletterLegacy
};
