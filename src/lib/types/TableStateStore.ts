import type { Writable } from 'svelte/store';
import type { TableState } from './TableState';

export interface TableStateStore {
	subscribe: Writable<TableState>['subscribe'];
	setSync: () => void;
	unsetSync: () => void;
	changeSort: (sortBy: string) => void;
	changeDir: (sortDir: 'asc' | 'desc') => void;
}
