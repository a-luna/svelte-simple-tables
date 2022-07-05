module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: '2020',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json'],
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	globals: {
		NodeJS: true,
	},
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', '**/TableCell.svelte/*_template.ts'],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'svelte3/named-blocks': true,
	},
	overrides: [
		{
			files: ['**/*.svelte/*.ts'],
			processor: 'svelte3/svelte3',
		},
	],
};
