import { getRandomHexString } from '$lib/util';
import type { TableState, TableStateStore } from 'src/types';
import { writable } from 'svelte/store';

export function createTableStateStore(
	tableId: string = null,
	sortBy: string,
	sortDir: 'asc' | 'desc',
	cellPadding = '0.375rem',
): TableStateStore {
	const { subscribe, update } = writable<TableState>({
		tableSync: false,
		tableId: tableId ?? `table-${getRandomHexString(8)}`,
		sortBy,
		sortDir,
		cellPadding,
	});

	return {
		subscribe,
		setSync: () => update((state) => ({ ...state, tableSync: true })),
		unsetSync: () => update((state) => ({ ...state, tableSync: false })),
		changeSort: (sortBy: string) => update((state) => ({ ...state, sortBy })),
		changeDir: (sortDir: 'asc' | 'desc') => update((state) => ({ ...state, sortDir })),
	};
}
