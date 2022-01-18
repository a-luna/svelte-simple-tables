import type { Writable } from 'svelte/store';
import type { TableSettings } from './TableSettings';

export interface TableState {
	set: Writable<TableSettings>['set'];
	subscribe: Writable<TableSettings>['subscribe'];
	reset: (totalRowsChanged: number, pageSize: number) => void;
	changePageSize: (pageSize: number) => void;
	changePageNumber: (page: number) => void;
	goToFirstPage: () => void;
	goToPrevPage: () => void;
	goToNextPage: () => void;
	goToLastPage: () => void;
}
