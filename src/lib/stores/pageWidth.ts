import { syncWidth } from '$lib/stores/syncWidth';
import type { PageWidthState } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
	return null;
};

export const pageWidth: Readable<PageWidthState> = derived(getPageWidth(), ($pageWidth) => {
	const isDefault = (width: number): boolean => width < 640;
	const isSmall = (width: number): boolean => width >= 640 && width < 768;
	const isMedium = (width: number): boolean => width >= 768 && width < 1024;
	const isLarge = (width: number): boolean => width >= 1024 && width < 1280;
	const isExtraLarge = (width: number): boolean => width >= 1280 && width < 1536;
	const is2xExtraLarge = (width: number): boolean => width >= 1536;
	const isMobileDisplay = (width: number): boolean => width < 768;

	return $pageWidth > 0
		? {
				current: $pageWidth,
				isMobileDisplay: isMobileDisplay($pageWidth),
				isDefault: isDefault($pageWidth),
				isSmall: isSmall($pageWidth),
				isMedium: isMedium($pageWidth),
				isLarge: isLarge($pageWidth),
				isExtraLarge: isExtraLarge($pageWidth),
				is2xExtraLarge: is2xExtraLarge($pageWidth),
		  }
		: {
				current: 0,
				isMobileDisplay: true,
				isDefault: true,
				isSmall: false,
				isMedium: false,
				isLarge: false,
				isExtraLarge: false,
				is2xExtraLarge: false,
		  };
});
