module.exports = {
	root: true,
	env: {
		amd: true,
		mocha: true,
		node: true,
		es6: true
	},
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-console': 0
	},
	extends: [ 'eslint:recommended', 'plugin:vue/base', 'plugin:prettier/recommended' ]
};
