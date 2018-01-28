
const isProd = !(process.env.NODE_ENV === "development");

const Config = {
  appTitle: "dotNET Weekly",
  appTitleShort: "DNW",
  appDescription: "A free weekly newsletter with .NET latest.",
  appThemeColor: "#287ab1",
  appBgColor: "#ffffff",
  appIcon: "assets/app-icon.png",
  apiDomain: isProd ? "https://dnw-api.azurewebsites.net/api/v1/" : "http://localhost:3000/api/v1/",
  client: isProd ? "https://dnw-pwa.azurewebsites.net/" : "http://localhost:5000/",
  loadDbName: "dnwLocal",
  analyticsPath: "//www.google-analytics.com/analytics.js"
};

module.exports = Config;
