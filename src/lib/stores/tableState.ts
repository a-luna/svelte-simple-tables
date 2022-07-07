import type { TableSettings, TableState } from '$lib/types';
import { getDefaultTableId } from '$lib/util';
import { writable } from 'svelte/store';

export function getDefaultTableSettings<R>(): TableSettings<R> {
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
		pageSize: 5,
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
			totalRows: 0,
			totalPages: 1,
			currentPage: 1,
			startRow: 0,
			endRow: 0,
		},
	};
}

export function createTableStateStore<R>(totalRows: number, settings: TableSettings<R>): TableState<R> {
	const pageSize = settings?.paginated ? settings?.pageSize || 5 : totalRows;
	const { set, subscribe, update } = writable<TableSettings<R>>({
		tableId: settings?.tableId || getDefaultTableId(),
		showHeader: settings?.showHeader || false,
		header: settings?.header ?? '',
		showSortDescription: settings?.showSortDescription || false,
		sortBy: settings?.sortBy,
		sortType: settings?.sortType,
		sortDir: settings?.sortDir || 'asc',
		tableWrapper: settings?.tableWrapper || false,
		expandToContainerWidth: settings?.expandToContainerWidth || false,
		themeName: settings?.themeName || 'lighter',
		clickableRows: settings?.clickableRows || false,
		animateSorting: settings?.animateSorting || false,
		paginated: settings?.paginated || false,
		pageSize: pageSize,
		pageSizeOptions: settings?.pageSizeOptions || [5, 10, 15],
		pageRangeFormat: settings?.pageRangeFormat || 'auto',
		pageNavFormat: settings?.pageNavFormat || 'auto',
		rowType: settings?.rowType || 'rows',
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
