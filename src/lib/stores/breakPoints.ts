import type { BreakPoint, BreakPointStore } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

function syncWidth(el: HTMLElement): Writable<number> {
	return writable(null, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetWidth));
		ro.observe(el);
		return () => ro.disconnect();
	});
}

const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
	return null;
};

export const breakPoints: Readable<BreakPointStore> = derived(getPageWidth(), ($pageWidth) => {
	const isDefault = (width: number): boolean => width < 640;
	const isSmall = (width: number): boolean => width >= 640 && width < 768;
	const isMedium = (width: number): boolean => width >= 768 && width < 1024;
	const isLarge = (width: number): boolean => width >= 1024 && width < 1280;
	const isExtraLarge = (width: number): boolean => width >= 1280 && width < 1536;
	const is2xExtraLarge = (width: number): boolean => width >= 1536;
	const isMobileDisplay = (width: number): boolean => width < 768;

	const getCurrentPageBreakPoint = (width: number): BreakPoint =>
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

	return $pageWidth > 0
		? {
				current: getCurrentPageBreakPoint($pageWidth),
				pageWidth: $pageWidth,
				isMobileDisplay: isMobileDisplay($pageWidth),
				isDefault: isDefault($pageWidth),
				isSmall: isSmall($pageWidth),
				isMedium: isMedium($pageWidth),
				isLarge: isLarge($pageWidth),
				isExtraLarge: isExtraLarge($pageWidth),
				is2xExtraLarge: is2xExtraLarge($pageWidth),
		  }
		: {
				current: 'default',
				pageWidth: 0,
				isMobileDisplay: true,
				isDefault: true,
				isSmall: false,
				isMedium: false,
				isLarge: false,
				isExtraLarge: false,
				is2xExtraLarge: false,
		  };
});
