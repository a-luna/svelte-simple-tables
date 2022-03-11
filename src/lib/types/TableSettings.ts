import type { PageRangeFormat, PaginationLayout, PropType, SortDirection, SyncState, TableTheme } from './literals';

export interface TableSettings {
	tableId?: string;
	showHeader?: boolean;
	header?: string;
	showSortDescription?: boolean;
	sortBy?: string;
	sortType?: PropType;
	sortDir?: SortDirection;
	tableWrapper?: boolean;
	themeName?: TableTheme;
	clickableRows?: boolean;
	animateSorting?: boolean;
	paginated?: boolean;
	pageSize?: number;
	pageSizeOptions?: number[];
	pageRangeFormat?: PageRangeFormat;
	pageNavFormat?: PaginationLayout;
	rowType?: string;
	state?: {
		syncState: SyncState;
		captionWidth: number;
		sortDescriptionWidth: number;
		tableWidth: number;
		paginationLeftWidth: number;
		paginationRightWidth: number;
		containerWidth: number;
	};
	pagination?: {
		totalRows: number;
		totalPages: number;
		currentPage: number;
		startRow: number;
		endRow: number;
	};
}
