import type { SortDirection, TableSettings, TableState, TableStateStore } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createTableStateStore(settings: Writable<TableSettings>): TableStateStore {
	let s: TableSettings;
	const unsubscribe = settings.subscribe((value) => (s = value));
	const { subscribe, update } = writable<TableState>({
		tableSync: false,
		tableId: s.tableId,
		sortBy: s.sortBy,
		sortDir: s.sortDir,
		captionWidth: 0,
		sortDescriptionWidth: 0,
		tableWidth: 0,
		paginationLeftWidth: 0,
		paginationRightWidth: 0,
	});
	unsubscribe();

	return {
		subscribe,
		setSync: () => update((state) => ({ ...state, tableSync: true })),
		unsetSync: () => update((state) => ({ ...state, tableSync: false })),
		changeSort: (sortBy: string) => update((state) => ({ ...state, sortBy })),
		changeDir: (sortDir: SortDirection) => update((state) => ({ ...state, sortDir })),
		updateCaptionWidth: (width: number) => update((state) => ({ ...state, captionWidth: width })),
		updateSortDescriptionWidth: (width: number) => update((state) => ({ ...state, sortDescriptionWidth: width })),
		updateTableWidth: (width: number) => update((state) => ({ ...state, tableWidth: width })),
		updatePaginationLeftWidth: (width: number) => update((state) => ({ ...state, paginationLeftWidth: width })),
		updatePaginationRightWidth: (width: number) => update((state) => ({ ...state, paginationRightWidth: width })),
	};
}

