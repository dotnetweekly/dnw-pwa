
const apiDomain = process.env.DOMAIN_API || "http://localhost:3000/api/v1/";
const client = process.env.CLIENT_DOMAIN || "http://localhost:5000/";

const Config = {
  appTitle: "dotNET Weekly",
  appTitleShort: "DNW",
  appDescription: "A free weekly newsletter with .NET latest.",
  appThemeColor: "#287ab1",
  appBgColor: "#ffffff",
  appIcon: "assets/app-icon.png",
  apiDomain: apiDomain,
  client: client,
  loadDbName: "dnwLocal",
  analyticsPath: "//www.google-analytics.com/analytics.js"
};

module.exports = Config;
