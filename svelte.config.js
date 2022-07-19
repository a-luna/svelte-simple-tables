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
				/(index.ts|context.ts|util.ts|package.json)/.test(filepath) || /components[\w/]*.svelte/.test(filepath),
		},
	},
};

export default config;
