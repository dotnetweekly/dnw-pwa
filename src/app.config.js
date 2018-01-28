
const isProd = (process.env.NODE_ENV === "production");

const Config = {
  appTitle: "dotNET Weekly",
  appTitleShort: "DNW",
  appDescription: "A free weekly newsletter with .NET latest.",
  appThemeColor: "#287ab1",
  appBgColor: "#ffffff",
  appIcon: "assets/app-icon.png",
  apiDomain: process.env.API_DOMAIN || "http://localhost:3000/api/v1/",
  client: process.env.CLIENT_DOMAIN || "http://localhost:5000/",
  loadDbName: "dnwLocal",
  analyticsPath: "//www.google-analytics.com/analytics.js"
};

module.exports = Config;
