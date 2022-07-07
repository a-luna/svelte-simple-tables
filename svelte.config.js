import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		package: {
			dir: 'package',
			emitTypes: true,
			exports: (filepath) =>
				/(index.ts|util.ts|package.json)/.test(filepath) || /components[\w/]*.svelte/.test(filepath),
		},
		vite: {
			test: {
				globals: false,
				environment: 'jsdom',
				dir: './src',
				moduleNameMapper: {
					'^\\$lib(.*)$': '<rootDir>/src/lib$1',
					'^\\$app(.*)$': ['<rootDir>/.svelte-kit/dev/runtime/app$1', '<rootDir>/.svelte-kit/build/runtime/app$1'],
				},
				coverage: {
					skipFull: true,
				},
			},
		},
	},
};

export default config;
