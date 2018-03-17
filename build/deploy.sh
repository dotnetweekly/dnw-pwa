rm -rf node_modules
npm install
npm install --only=dev

rm -rf dist
sed -i 's/http:\/\/localhost:3000/https:\/\/dnw-api.azurewebsites.net/g' ./app.config.js
sed -i 's/http:\/\/localhost:5000/https:\/\/www.dotnetweekly.com/g' ./app.config.js
sed -i 's/http:\/\/localhost:6100/https:\/\/dnw-newsletter.azurewebsites.net/g' ./app.config.js

npm run build

rm -rf ../wwwroot/dist
cp -TR ./dist/ ../wwwroot/dist/

cp -TR ./server/ ../wwwroot/server/
cp -R ./server.js ../wwwroot/server.js
cp -R ./app.config.js ../wwwroot/app.config.js
cp -R ./package.json ../wwwroot/package.json
cp -R ./package-lock.json ../wwwroot/package-lock.json

cp -R ./src/assets/app-icon.png ../wwwroot/dist/assets/app-icon.png
cp -R ./src/assets/favicon.ico ../wwwroot/dist/favicon.ico
cp -R ./src/assets/logo.jpg ../wwwroot/dist/assets/logo.jpg
cp -R ./src/assets/robots.txt ../wwwroot/dist/robots.txt
cp -R ./src/assets/googlefce38ef115597145.html ../wwwroot/dist/googlefce38ef115597145.html

cd ../wwwroot
rm -rf node_modules
npm install --only=production
# npm install inherits
# npm install forever
