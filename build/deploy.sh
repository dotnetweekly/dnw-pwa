npm install
npm install --only=dev

rm -rf build
rm -rf dist

npm run build

cp -i ./dist ../wwwroot/dist
cp -i ./index.html ../wwwroot/index.html
cp -i ./server.js ../wwwroot/server.js
cp -i ./package.json ../wwwroot/package.json

cd ../wwwroot
npm install --only=production
