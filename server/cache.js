const LRU = require('lru-cache');

const microCache = LRU({
	max: 100,
	maxAge: 120000
});

module.exports = microCache;
