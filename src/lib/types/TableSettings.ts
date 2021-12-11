import type { PageRangeFormat, PaginationLayout, SortDirection, TableLayout, TableTheme } from './literals';

export interface TableSettings {
	tableId?: string;
	showHeader?: boolean;
	header?: string;
	showSortDescription?: boolean;
	fullWidth?: boolean;
	tableLayout?: TableLayout;
	sortBy?: string;
	sortDir?: SortDirection;
	tableWrapper?: boolean;
	themeName?: TableTheme;
	paginated?: boolean;
	pageSize?: number;
	pageSizeOptions?: number[];
	pageRangeFormat?: PageRangeFormat;
	pageNavFormat?: PaginationLayout;
	rowType?: string;
}
