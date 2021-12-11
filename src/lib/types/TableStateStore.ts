import type { Writable } from 'svelte/store';
import type { SortDirection } from './literals';
import type { TableState } from './TableState';

export interface TableStateStore {
	subscribe: Writable<TableState>['subscribe'];
	setSync: () => void;
	unsetSync: () => void;
	changeSort: (sortBy: string) => void;
	changeDir: (sortDir: SortDirection) => void;
	updateCaptionWidth: (width: number) => void;
	updateSortDescriptionWidth: (width: number) => void;
	updateTableWidth: (width: number) => void;
	updatePaginationLeftWidth: (width: number) => void;
	updatePaginationRightWidth: (width: number) => void;
}
