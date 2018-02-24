const routerMeta = require("./router-meta");

function seoOptimize(html, req, state) {
  const url = req.url;

  let metadata = routerMeta(url, state) || {
    title: "dotNET Weekly",
    description: "A free weekly newsletter on .NET latest"
  };

  if (metadata.rss) {
    html = html.replace(/<meta name="rss-feed" \/>(<link (.*?) \/>)*/gmi,
      `<meta name="rss-feed" /><link rel="alternate" type="application/rss+xml" title="${metadata.title}" href="${metadata.rss}" />`
    );
  }

  html = html.replace(/<meta name="description" content="(.*?)">/gmi,
    `<meta name="description" content="${metadata.description}">`
  );
  html = html.replace(/<meta property="og:description" content="(.*?)">/gmi,
    `<meta property="og:description" content="${metadata.description}">`
  );
  html = html.replace(/<meta property="og:title" content="(.*?)">/gmi,
    `<meta property="og:title" content="${metadata.title}">`
  );
  html = html.replace(/<title>(.*?)<\/title>/gmi,
    `<title>${metadata.title}</title>`
  );
  return html;
}

module.exports = seoOptimize;
