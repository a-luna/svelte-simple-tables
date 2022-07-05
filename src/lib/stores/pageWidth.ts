/* c8 ignore start */
import { syncWidth } from '$lib/stores/syncWidth';
import type { PageWidthState } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
};

export const pageWidth: Readable<PageWidthState> = derived(getPageWidth(), ($pageWidth) => {
	const isDefault = (width: number): boolean => width < 640;
	const isSmall = (width: number): boolean => width >= 640 && width < 768;
	const isMedium = (width: number): boolean => width >= 768 && width < 1024;
	const isLarge = (width: number): boolean => width >= 1024 && width < 1280;
	const isExtraLarge = (width: number): boolean => width >= 1280 && width < 1536;
	const is2xExtraLarge = (width: number): boolean => width >= 1536;
	const isMobileDisplay = (width: number): boolean => width < 768;

	const breakPoint = (width: number): string =>
		isDefault(width)
			? 'default'
			: isSmall(width)
			? 'sm'
			: isMedium(width)
			? 'md'
			: isLarge(width)
			? 'lg'
			: isExtraLarge(width)
			? 'xl'
			: '2xl';

	const validInterface = {
		current: $pageWidth,
		breakPoint: breakPoint($pageWidth),
		isMobileDisplay: isMobileDisplay($pageWidth),
		isDefault: isDefault($pageWidth),
		isSmall: isSmall($pageWidth),
		isMedium: isMedium($pageWidth),
		isLarge: isLarge($pageWidth),
		isExtraLarge: isExtraLarge($pageWidth),
		is2xExtraLarge: is2xExtraLarge($pageWidth),
	};

	const NullInterface = {
		current: 0,
		breakPoint: 'default',
		isMobileDisplay: true,
		isDefault: true,
		isSmall: false,
		isMedium: false,
		isLarge: false,
		isExtraLarge: false,
		is2xExtraLarge: false,
	};

	return $pageWidth > 0 ? validInterface : NullInterface;
});
/* c8 ignore stop */
