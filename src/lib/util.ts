import type { AriaAttributes, PropType, SortDirection } from '$lib/types';

export const getDefaultTableId = (): string => `table-${getRandomHexString(8)}`;

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.substring(1);

export const capitalizeSentence = (string: string): string =>
	string
		.split(' ')
		.map((s) => capitalize(s))
		.join(' ');

export function formatNumber(input: number | string, precision = 0): string {
	const unformatted = typeof input === 'number' ? input : parseFloat(input);
	return unformatted.toLocaleString('en-US', { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const getCSSPropPadding = (
	element: HTMLElement,
	propName: string,
): { top: string; right: string; bottom: string; left: string } => {
	const cssLengthRegex = /(\s*)(?<css_len>(0)|(\d?(.\d*)(em|rem|px))|(auto))/g;
	const propValue = getCSSPropValue(element, propName);
	if (propValue) {
		const cssPadding = [...propValue.matchAll(cssLengthRegex)].map((m) => m.groups.css_len);
		switch (cssPadding.length) {
			case 1:
				return { top: cssPadding[0], right: cssPadding[0], bottom: cssPadding[0], left: cssPadding[0] };
			case 2:
				return { top: cssPadding[0], right: cssPadding[1], bottom: cssPadding[0], left: cssPadding[1] };
			case 3:
				return { top: cssPadding[0], right: cssPadding[1], bottom: cssPadding[2], left: cssPadding[1] };
			case 4:
				return { top: cssPadding[0], right: cssPadding[1], bottom: cssPadding[2], left: cssPadding[3] };
		}
	}
	return null;
};

export function getTableFontSize(tableId: string): string {
	if (typeof window !== 'undefined') {
		const tableWrapper = document.getElementById(`${tableId}-wrapper`);
		if (tableWrapper) {
			let fontSize = getCSSPropValue(tableWrapper, '--sst-font-size');
			if (!fontSize) {
				fontSize = getCSSPropValue(tableWrapper, '--sst-default-font-size');
			}
			return fontSize || '14px;';
		}
	}
}

export function getBorderCssValues(tableId: string): string {
	if (typeof window !== 'undefined') {
		const tableWrapper = document.getElementById(`${tableId}-wrapper`);
		if (tableWrapper) {
			let borderWidth = getCSSPropValue(tableWrapper, '--sst-table-wrapper-border-width');
			if (!borderWidth) {
				borderWidth = getCSSPropValue(tableWrapper, '--sst-default-table-wrapper-border-width');
			}
			let borderStyle = getCSSPropValue(tableWrapper, '--sst-table-wrapper-border-style');
			if (!borderStyle) {
				borderStyle = getCSSPropValue(tableWrapper, '--sst-default-table-wrapper-border-style');
			}
			let borderColor = getCSSPropValue(tableWrapper, '--sst-table-wrapper-border-color');
			if (!borderColor) {
				borderColor = getCSSPropValue(tableWrapper, '--sst-default-table-wrapper-border-color');
			}
			const tableWrapperBorderCss = removeAllQuoteChars(`${borderWidth} ${borderStyle} ${borderColor}`);
			return borderWidth && borderStyle && borderColor ? tableWrapperBorderCss : 'none';
		}
		return 'none';
	}
}

function removeAllQuoteChars(input: string): string {
	return input.replaceAll(/['"`]/g, '');
}

export function getDefaultColHeader(propName: string): string {
	const snakeCaseRegex = /^[a-z_]*$/;
	const camelCaseRegex = /^[A-Za-z]+[^[`]$/;
	if (snakeCaseRegex.test(propName)) {
		return capitalizeSentence(propName.split('_').join(' '));
	}
	if (camelCaseRegex.test(propName)) {
		const wordBoundaries = Array.from({ length: propName.length }, (_, i) => propName.charCodeAt(i))
			.map((n, i) => ({ isUpper: n < 97, index: i }))
			.filter((x) => x.isUpper)
			.map((x) => x.index);
		let start = 0;
		const words = [];
		for (const i of wordBoundaries) {
			words.push(capitalize(propName.slice(start, i)));
			start = i;
		}
		words.push(propName.slice(start, propName.length));
		return words.join(' ');
	}
	return propName;
}

export function getSortFunction<T>(propName: string, propType: PropType, dir: SortDirection): (a: T, b: T) => number {
	const sortFunctionMap = {
		string: {
			desc: (a: T, b: T) => b[propName].localeCompare(a[propName]),
			asc: (a: T, b: T) => a[propName].localeCompare(b[propName]),
		},
		number: {
			desc: (a: T, b: T) => b[propName] - a[propName],
			asc: (a: T, b: T) => a[propName] - b[propName],
		},
		boolean: {
			desc: (a: T, b: T) => Number(b[propName]) - Number(a[propName]),
			asc: (a: T, b: T) => Number(a[propName]) - Number(b[propName]),
		},
		date: {
			desc: (a: T, b: T) => (b[propName] > a[propName] ? 1 : -1),
			asc: (a: T, b: T) => (a[propName] > b[propName] ? 1 : -1),
		},
		unsorted: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			desc: (a: T, b: T) => 0,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			asc: (a: T, b: T) => 0,
		},
	};
	return sortFunctionMap[propType][dir];
}

export function getColumnWidth(tableId: string, colStat: string, sortBy: string): number {
	if (typeof window !== 'undefined') {
		const minWidth = getColHeaderWidth(tableId, colStat, sortBy);
		const colElementsQuery = `#${tableId} .table-body-cell[data-stat-name="${colStat}"] > *`;
		const columnElements = Array.from(document.querySelectorAll<HTMLElement>(colElementsQuery));
		if (columnElements.length > 0) {
			const widestElementInColumn = columnElements.reduce((max, el) => (max.offsetWidth > el.offsetWidth ? max : el));
			return Math.max(widestElementInColumn.offsetWidth, minWidth);
		}
		return minWidth;
	}
	return 0;
}

function getColHeaderWidth(tableId: string, colStat: string, sortStat: string): number {
	const colHeaderQuery = `#${tableId} .sortable[data-stat-name="${colStat}"] .header-content`;
	const colHeaderContent = document.querySelector<HTMLElement>(colHeaderQuery);
	const colHeaderWidth = colHeaderContent?.scrollWidth ?? 0;
	const sortIconWidth = colStat === sortStat ? getTableFontSizeInPixels(tableId) : 0;
	const finalWidth = colHeaderWidth + sortIconWidth;
	return finalWidth;
}

export function getTableFontSizeInPixels(tableId: string): number {
	const match = /(?<css_len>\d?.\d*)px/.exec(getTableFontSize(tableId));
	if (match) {
		return parseInt(match.groups.css_len);
	}
}

export function getAriaValues(
	pageNumber: number,
	currentPage: number,
	totalPages: number,
	disabled: boolean,
): AriaAttributes {
	const aria: AriaAttributes = {};
	const label = [];
	if (currentPage === totalPages) {
		label.push('Last Page');
	}
	if (currentPage === pageNumber) {
		label.push('Current Page');
		aria['aria-current'] = true;
	}
	if (disabled) {
		aria['aria-disabled'] = true;
	}
	label.push(`Goto Page ${pageNumber}`);
	aria['aria-label'] = label.join(', ');
	return aria;
}
