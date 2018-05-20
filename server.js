const app = require("./server/app");
const https = require("https");
const fs = require("fs");
const path = require("path");

app.set("port", process.env.PORT || 5000);

const options = {
  cert: fs.readFileSync(path.resolve(__dirname, "./.sslcert/fullchain1.pem")),
  key: fs.readFileSync(path.resolve(__dirname, "./.sslcert/privkey1.pem"))
};

const server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});
https.createServer(options, app).listen(8443);
