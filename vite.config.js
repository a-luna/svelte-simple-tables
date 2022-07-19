/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
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
});
