module.exports = {
	root: true,
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	},
	extends: [ 'eslint:recommended', 'plugin:vue/base', 'plugin:prettier/recommended' ]
};
