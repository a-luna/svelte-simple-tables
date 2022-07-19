import type { PageRangeFormat, PaginationLayout, PropType, SortDirection, SyncState, TableTheme } from './literals';

export interface TableSettings<R> {
	tableId?: string;
	themeName?: TableTheme;
	showHeader?: boolean;
	header?: string;
	showSortDescription?: boolean;
	sortBy?: keyof R;
	sortType?: PropType;
	sortDir?: SortDirection;
	tableWrapper?: boolean;
	expandToContainerWidth?: boolean;
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
