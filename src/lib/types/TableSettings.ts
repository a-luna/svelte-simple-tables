export interface TableSettings {
	tableId?: string;
	showHeader?: boolean;
	header?: string;
	showSortDescription?: boolean;
	sortBy?: string;
	sortDir?: 'asc' | 'desc';
	tableWrapper?: boolean;
	themeName?: 'default' | 'light' | 'dark' | 'git';
	paginated?: boolean;
	pageSize?: number;
	pageSizeOptions?: number[];
	pageNavLayout?: 'auto' | 'full' | 'compact';
	rowTypeSingle?: string;
	rowTypePlural?: string;
}
