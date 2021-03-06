import type { TableSettings, TableState } from '$lib/types';
import { getDefaultTableId } from '$lib/util';
import { writable } from 'svelte/store';

export function getDefaultTableSettings<R>(totalRows = 5): TableSettings<R> {
	return {
		tableId: getDefaultTableId(),
		showHeader: false,
		header: '',
		showSortDescription: false,
		sortBy: null,
		sortType: null,
		sortDir: 'asc',
		tableWrapper: false,
		expandToContainerWidth: false,
		themeName: 'lighter',
		clickableRows: false,
		animateSorting: false,
		paginated: false,
		pageSize: totalRows,
		pageSizeOptions: [5, 10, 15],
		pageRangeFormat: 'auto',
		pageNavFormat: 'auto',
		rowType: 'rows',
		state: {
			syncState: 'not-started',
			captionWidth: 0,
			sortDescriptionWidth: 0,
			tableWidth: 0,
			paginationLeftWidth: 0,
			paginationRightWidth: 0,
			containerWidth: 0,
		},
		pagination: {
			totalRows: totalRows,
			totalPages: 1,
			currentPage: 1,
			startRow: 0,
			endRow: totalRows,
		},
	};
}

export function createTableStateStore<R>(totalRows: number, settings: TableSettings<R>): TableState<R> {
	const pageSize = settings?.paginated ? settings?.pageSize || 5 : totalRows;
	const { set, subscribe, update } = writable<TableSettings<R>>({
		...getDefaultTableSettings<R>(totalRows),
		...settings,
		pagination: {
			totalRows: totalRows,
			totalPages: Math.ceil(totalRows / pageSize),
			currentPage: 1,
			startRow: 0,
			endRow: Math.min(pageSize, totalRows),
		},
	});

	function reset(totalRowsChanged: number, pageSize: number, settings: TableSettings<R>): TableSettings<R> {
		totalRows = totalRowsChanged;
		return changePageSize(pageSize, settings);
	}

	function changePageSize(pageSize: number, settings: TableSettings<R>): TableSettings<R> {
		settings.pageSize = pageSize;
		settings.pagination = {
			totalRows: totalRows,
			totalPages: Math.ceil(totalRows / pageSize),
			currentPage: 1,
			startRow: 0,
			endRow: Math.min(pageSize, totalRows),
		};
		settings.state.syncState = 'finished-sort-table';
		return settings;
	}

	function goToPage(pageNumber: number, settings: TableSettings<R>): TableSettings<R> {
		const { pagination } = settings;
		settings.pagination = {
			...pagination,
			currentPage: pageNumber,
			startRow: (pageNumber - 1) * settings.pageSize,
			endRow: Math.min(pageNumber * settings.pageSize, totalRows),
		};
		settings.state.syncState = 'finished-sort-table';
		return settings;
	}

	return {
		set,
		subscribe,
		reset: (totalRowsChanged: number, pageSize: number) =>
			update((settings) => reset(totalRowsChanged, pageSize, settings)),
		changePageSize: (pageSize: number) => update((settings) => changePageSize(pageSize, settings)),
		changePageNumber: (page: number) => update((settings) => goToPage(page, settings)),
		goToFirstPage: () => update((settings) => goToPage(1, settings)),
		goToPrevPage: () => update((settings) => goToPage(settings.pagination.currentPage - 1, settings)),
		goToNextPage: () => update((settings) => goToPage(settings.pagination.currentPage + 1, settings)),
		goToLastPage: () => update((settings) => goToPage(settings.pagination.totalPages, settings)),
	};
}
