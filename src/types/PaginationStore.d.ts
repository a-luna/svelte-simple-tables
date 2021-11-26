import type { Writable } from 'svelte/store';
import type { PaginationSettings } from './PaginationSettings';

export interface PaginationStore {
	subscribe: Writable<PaginationSettings>['subscribe'];
	changeTotalRows: (total: number) => void;
	changePageSize: (size: number) => void;
	changePageNumber: (page: number) => void;
	goToFirstPage: () => void;
	goToPrevPage: () => void;
	goToNextPage: () => void;
	goToLastPage: () => void;
}
