import type { PaginationSettings, PaginationStore } from '$lib/types';
import { writable } from 'svelte/store';

export function createPaginationStore(totalRows: number, pageSize: number, pageSizeOptions: number[]): PaginationStore {
	const { subscribe, update } = writable<PaginationSettings>(reset(totalRows, pageSize, pageSizeOptions));

	function reset(totalRows: number, pageSize: number, pageSizeOptions: number[]): PaginationSettings {
		return {
			totalRows,
			pageSize,
			pageSizeOptions,
			currentPage: 1,
			totalPages: Math.ceil(totalRows / pageSize),
			startRow: 0,
			endRow: Math.min(pageSize, totalRows),
		};
	}

	function goToPage(pageNumber: number, settings: PaginationSettings): PaginationSettings {
		const { totalRows, pageSize } = settings;
		return {
			...settings,
			currentPage: pageNumber,
			startRow: (pageNumber - 1) * pageSize,
			endRow: Math.min(pageNumber * pageSize, totalRows),
		};
	}

	return {
		subscribe,
		changeTotalRows: (totalRows: number) =>
			update((settings) => reset(totalRows, settings.pageSize, settings.pageSizeOptions)),
		changePageSize: (pageSize: number) =>
			update((settings) => reset(settings.totalRows, pageSize, settings.pageSizeOptions)),
		changePageNumber: (page: number) => update((settings) => goToPage(page, settings)),
		goToFirstPage: () => update((settings) => goToPage(1, settings)),
		goToPrevPage: () => update((settings) => goToPage(settings.currentPage - 1, settings)),
		goToNextPage: () => update((settings) => goToPage(settings.currentPage + 1, settings)),
		goToLastPage: () => update((settings) => goToPage(settings.totalPages, settings)),
	};
}
