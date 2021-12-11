import type { SortDirection } from './literals';

export interface TableState {
	tableSync: boolean;
	tableId: string;
	sortBy: string;
	sortDir: SortDirection;
	captionWidth: number;
	sortDescriptionWidth: number;
	tableWidth: number;
	paginationLeftWidth: number;
	paginationRightWidth: number;
}
