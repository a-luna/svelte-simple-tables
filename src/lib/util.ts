import type { AriaAttributes, PropType, SortDirection } from '$lib/types';

const KEBAB_CASE_REGEX = /^(?=.*-)[a-z-]*$/;
const SNAKE_CASE_REGEX = /^(?=.*_)[a-z_]*$/;
const CAMEL_CASE_REGEX = /^[a-z](?=.*[A-Z])[A-Za-z]*[^[-`]$/;

export const getDefaultTableId = (): string => `table-${getRandomHexString(8)}`;

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.substring(1);

export function formatNumber(input: number | string, precision = 0): string {
	const unformatted = typeof input === 'number' ? input : parseFloat(input);
	return unformatted.toLocaleString('en-US', { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

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

export function getDefaultColHeader(propName: string, capitalized = true): string {
	let words = [propName];
	if (KEBAB_CASE_REGEX.test(propName)) {
		words = getWordsFromKebabCase(propName);
	}
	if (SNAKE_CASE_REGEX.test(propName)) {
		words = getWordsFromSnakeCase(propName);
	}
	if (CAMEL_CASE_REGEX.test(propName)) {
		words = getWordsFromCamelCase(propName);
	}
	return capitalized ? words.map((w) => capitalize(w)).join(' ') : words.map((w) => w.toLowerCase()).join(' ');
}

function getWordsFromKebabCase(input: string): string[] {
	return input.split('-');
}

function getWordsFromSnakeCase(input: string): string[] {
	return input.split('_');
}

function getWordsFromCamelCase(input: string): string[] {
	const wordBoundaries = Array.from({ length: input.length }, (_, i) => input.charCodeAt(i))
		.map((n, i) => ({ isUpper: n < 97, index: i }))
		.filter((x) => x.isUpper)
		.map((x) => x.index);
	let start = 0;
	const words = [];
	for (const i of wordBoundaries) {
		words.push(input.slice(start, i));
		start = i;
	}
	words.push(input.slice(start, input.length));
	return words;
}

export function getValidPropertyNames(input: string): [string, string] {
	if (CAMEL_CASE_REGEX.test(input)) {
		const kebabCase = getWordsFromCamelCase(input)
			.map((w) => w.toLowerCase())
			.join('-');
		return [input, kebabCase];
	}
	if (KEBAB_CASE_REGEX.test(input)) {
		const words = getWordsFromKebabCase(input);
		const wordsCapitalized = words.slice(1).map((w) => capitalize(w));
		const camelCase = [words[0], ...wordsCapitalized].join('');
		return [camelCase, input];
	}
	return [input, input];
}

export function getSortFunction<T>(propName: string, propType: PropType, dir: SortDirection): (a: T, b: T) => number {
	let sort: { desc: (a: T, b: T) => number; asc: (a: T, b: T) => number };
	switch (propType) {
		case 'string':
			sort = {
				desc: (a: T, b: T) => b[propName].localeCompare(a[propName]),
				asc: (a: T, b: T) => a[propName].localeCompare(b[propName]),
			};
			break;
		case 'number':
		case 'boolean':
			sort = {
				desc: (a: T, b: T) => Number(b[propName]) - Number(a[propName]),
				asc: (a: T, b: T) => Number(a[propName]) - Number(b[propName]),
			};
			break;
		case 'date':
			sort = {
				desc: (a: T, b: T) => (b[propName] > a[propName] ? 1 : -1),
				asc: (a: T, b: T) => (a[propName] > b[propName] ? 1 : -1),
			};
			break;
		default:
			sort = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				desc: (a: T, b: T) => 0,
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				asc: (a: T, b: T) => 0,
			};
	}
	return sort[dir];
}

const elementsInColSelector = (tableId: string, colStat: string): string =>
	`#${tableId} .table-body-cell[data-stat-name="${colStat}"] > *`;

const colHeaderSelector = (tableId: string, colStat: string): string =>
	`#${tableId} .sortable[data-stat-name="${colStat}"] .header-content`;

export function getColumnWidth(tableId: string, colStat: string, sortBy: string): number {
	if (typeof window !== 'undefined') {
		const columnElements = Array.from(document.querySelectorAll<HTMLElement>(elementsInColSelector(tableId, colStat)));
		const widestElement = columnElements.reduce((max, el) => (max.offsetWidth > el.offsetWidth ? max : el)).offsetWidth;
		return Math.max(widestElement, getColHeaderWidth(tableId, colStat, sortBy));
	}
}

function getColHeaderWidth(tableId: string, colStat: string, sortStat: string): number {
	const colHeaderWidth = document.querySelector<HTMLElement>(colHeaderSelector(tableId, colStat))?.scrollWidth ?? 0;
	return colStat === sortStat ? colHeaderWidth + getTableFontSizeInPixels(tableId) : colHeaderWidth;
}

function getNumberOfPixelsFromString(input: string): number {
	const match = /(?<css_len>\d?.\d*)px/.exec(input);
	if (match) {
		return parseFloat(match.groups.css_len);
	}
}

export function getTableFontSize(tableId: string): string {
	if (typeof window !== 'undefined') {
		const tableElement = document.getElementById(tableId);
		if (tableElement) {
			return getStyle(tableElement, 'font-size');
		}
	}
}

export const getTableFontSizeInPixels = (tableId: string): number =>
	getNumberOfPixelsFromString(getTableFontSize(tableId));

export function getTableWrapperPaddingWidth(tableId: string): number {
	if (typeof window !== 'undefined') {
		const tableWrapper = document.getElementById(`${tableId}-wrapper`);
		if (tableWrapper) {
			const paddingLeft = getNumberOfPixelsFromString(getStyle(tableWrapper, 'padding-left')) ?? 0;
			const paddingRight = getNumberOfPixelsFromString(getStyle(tableWrapper, 'padding-right')) ?? 0;
			const borderLeft = getNumberOfPixelsFromString(getStyle(tableWrapper, 'border-left-width')) ?? 0;
			const borderRight = getNumberOfPixelsFromString(getStyle(tableWrapper, 'border-right-width')) ?? 0;
			return paddingLeft + paddingRight + borderLeft + borderRight;
		}
		return 0;
	}
}

function getStyle(el: HTMLElement, property: string) {
	const [camelCase, kebabCase] = getValidPropertyNames(property);
	if (el?.style[camelCase]) {
		return el?.style[camelCase];
	}
	if (typeof window !== 'undefined' && window?.getComputedStyle) {
		const compStyles = window.getComputedStyle(el);
		return compStyles?.getPropertyValue(kebabCase);
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
