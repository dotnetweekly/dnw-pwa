const LRU = require("lru-cache");

const microCache = LRU({
  max: 50,
  maxAge: 120000
});

module.exports = microCache;
