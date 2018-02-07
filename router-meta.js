const config = require("./app.config");

const routerMeta = [
  {
    id: "about",
    match: /^\/about$/,
    title: "dotNET Weekly | About",
    description: "About dotNET Weekly"
  },
  {
    id: "links",
    match: /(^(\/week\/(.*?)\/year\/(.*?))$)|(^\/$)/,
    title: "",
    description: "",
    rss: ""
  },
  {
    id: "link",
    match: /^\/(.*?)\/(.*?).$/,
    title: "",
    description: "",
    rss: ""
  },
  {
    id: "main",
    match: /^(.*?)$/,
    title: "dotNET Weekly",
    description: "A free weekly newsletter on .NET latest"
  }
]

function parseLink(routerMetaItem, state) {
  if (!state || !state.linkModule || !state.linkModule.link) {
    return;
  }
  routerMetaItem.rss =
    `${config.apiDomain}links/${state.linkModule.link.slug}?feed=rss`;
  routerMetaItem.title = state.linkModule.link.title;
  routerMetaItem.description = state.linkModule.link.content;

  return routerMetaItem;
}

function parseLinks(routerMetaItem, state) {
  if (!state || !state.linksModule || !state.linksModule.filter || !state.linksModule.filter.dateWeek) {
    return;
  }
  const week = state.linksModule.filter.dateWeek;
  const year = state.linksModule.filter.dateYear;
  const category = state.linksModule.filter.category;
  const dateRoute = (week && year) ? `week=${week}&year=${year}&` : "";
  const dateTitle = (week && year) ? ` | Week ${week} Year ${year}` : "";

  routerMetaItem.rss =
    `${config.apiDomain}links/?category=${category}${dateRoute}&feed=rss`;
  routerMetaItem.title = `dotNET Weekly${dateTitle}`;
  routerMetaItem.description = `A free weekly newsletter on .NET latest${dateTitle}`;

  return routerMetaItem;
}

function getMeta(url, state) {
  if (!url) {
    return;
  }

  for (var key = 0; key < routerMeta.length; key++) {
    if (url.match(routerMeta[key].match)) {
      if (routerMeta[key].id === "link") {
        return parseLink(routerMeta[key], state);
      } else if (routerMeta[key].id === "links") {
        return parseLinks(routerMeta[key], state);
      }
      return routerMeta[key];
    }
  }
}

module.exports = getMeta;
