import type { TableSettings, TableState } from '$lib/types';
import { getDefaultTableId } from '$lib/util';
import { writable } from 'svelte/store';

export function createTableStateStore(totalRows: number, settings: TableSettings): TableState {
	const pageSize = settings?.paginated ? settings?.pageSize || 5 : totalRows;
	const { set, subscribe, update } = writable<TableSettings>({
		tableId: settings?.tableId || getDefaultTableId(),
		showHeader: settings?.showHeader || false,
		header: settings?.header ?? '',
		showSortDescription: settings?.showSortDescription || false,
		fullWidth: settings?.fullWidth || false,
		sortBy: settings?.sortBy,
		sortType: settings?.sortType,
		sortDir: settings?.sortDir || 'asc',
		tableWrapper: settings?.tableWrapper || false,
		themeName: settings?.themeName || 'lighter',
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
		},
		pagination: {
			totalRows: totalRows,
			totalPages: Math.ceil(totalRows / pageSize),
			currentPage: 1,
			startRow: 0,
			endRow: Math.min(pageSize, totalRows),
		},
	});

	function togglePagination(settings: TableSettings): TableSettings {
		settings.paginated = !settings.paginated;
		const newPageSize = settings.paginated ? settings.pageSize : totalRows;
		settings.pagination = {
			totalRows,
			totalPages: Math.ceil(totalRows / newPageSize),
			currentPage: 1,
			startRow: 0,
			endRow: Math.min(newPageSize, totalRows),
		};
		settings.state.syncState = 'finished-sort-table';
		return settings;
	}

	function changePageSize(pageSize: number, settings: TableSettings): TableSettings {
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

	function goToPage(pageNumber: number, settings: TableSettings): TableSettings {
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
		changePageSize: (pageSize: number) => update((settings) => changePageSize(pageSize, settings)),
		togglePagination: () => update((settings) => togglePagination(settings)),
		changePageNumber: (page: number) => update((settings) => goToPage(page, settings)),
		goToFirstPage: () => update((settings) => goToPage(1, settings)),
		goToPrevPage: () => update((settings) => goToPage(settings.pagination.currentPage - 1, settings)),
		goToNextPage: () => update((settings) => goToPage(settings.pagination.currentPage + 1, settings)),
		goToLastPage: () => update((settings) => goToPage(settings.pagination.totalPages, settings)),
	};
}
