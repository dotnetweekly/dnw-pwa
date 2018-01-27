npm install
npm run build

cp dist/* ../wwwroot/dist/*
cp index.html ../wwwroot/index.html
cp server.js ../wwwroot/server.js
cp package.json ../wwwroot/package.json

cd ../wwwroot
npm install --only=production
