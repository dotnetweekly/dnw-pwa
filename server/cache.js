const LRU = require('lru-cache');

const microCache = LRU({
	max: 500,
	maxAge: 60000
});

module.exports = microCache;
