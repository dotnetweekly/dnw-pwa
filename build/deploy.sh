npm install
npm install --only=dev

rm -rf dist
sed -i 's/http:\/\/localhost:3000/https:\/\/dnw-api.azurewebsites.net/g' ./app.config.js
sed -i 's/http:\/\/localhost:5000/https:\/\/dnw-admin.azurewebsites.net/g' ./app.config.js
sed -i 's/http:\/\/localhost:6100/https:\/\/dnw-newsletter.azurewebsites.net/g' ./app.config.js

npm run build

cp -TR ./dist/ ../wwwroot/dist/
cp -R ./index.html ../wwwroot/index.html
cp -R ./server.js ../wwwroot/seo.js
cp -R ./server.js ../wwwroot/router-meta.js
cp -R ./server.js ../wwwroot/server.js
cp -R ./package.json ../wwwroot/package.json
cp -R ./src/assets/app-icon.png ../wwwroot/dist/assets/app-icon.png
cp -R ./src/assets/favicon.ico ../wwwroot/dist/favicon.ico
cp -R ./src/assets/logo.jpg ../wwwroot/dist/assets/logo.jpg
cp -R ./src/assets/robots.txt ../wwwroot/dist/robots.txt

cd ../wwwroot
npm install --only=production
