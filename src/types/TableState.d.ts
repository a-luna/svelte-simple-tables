export interface TableState {
	tableSync: boolean;
	tableId: string;
	sortBy: string;
	sortDir: 'asc' | 'desc';
	cellPadding: string;
}
