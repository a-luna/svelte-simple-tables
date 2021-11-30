import type { AriaAttributes, BreakPoint } from '$lib/types';

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

export function getSortFunction<T>(
	propName: string,
	propType: 'string' | 'number' | 'boolean' | 'date',
	dir: 'asc' | 'desc',
): (a: T, b: T) => number {
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
	};
	return sortFunctionMap[propType][dir];
}

export function getColumnWidth(tableId: string, colStat: string, sortBy: string, breakPoint: BreakPoint): number {
	if (typeof window !== 'undefined') {
		const minWidth = getMinColWidth(tableId, colStat, sortBy, breakPoint);
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

function getMinColWidth(tableId: string, colStat: string, sortStat: string, breakPoint: BreakPoint): number {
	const colHeaderQuery = `#${tableId} .sortable[data-stat-name="${colStat}"] .header-content`;
	const colHeaderContent = document.querySelector<HTMLElement>(colHeaderQuery);
	const colHeaderWidth = colHeaderContent?.scrollWidth ?? 0;
	const sortIconWidth = colStat === sortStat ? getSortIconWidth(breakPoint) : 0;
	const minColWidth = colHeaderWidth + sortIconWidth;
	return minColWidth;
}

function getSortIconWidth(breakPoint: string): number {
	switch (breakPoint) {
		case 'default':
		case 'sm':
			return 14;

		case 'md':
			return 15;

		case 'lg':
		case 'xl':
		case '2xl':
			return 16;

		default:
			return 0;
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
