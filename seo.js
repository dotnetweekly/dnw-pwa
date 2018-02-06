function seoOptimize(html){
  html = html.replace('<meta name="rss-feed" />', '<meta name="rss-feed" value="oh hi22"/>');
  return html;
}

module.exports = seoOptimize;
