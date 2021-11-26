export interface TableSettings {
	tableId?: string;
	showHeader?: boolean;
	header?: string;
	showSortDescription?: boolean;
	sortBy?: string;
	sortDir?: 'asc' | 'desc';
	paginated?: boolean;
	pagination?: {
		pageSize?: number;
		pageSizeOptions?: number[];
		pageNavLayout?: 'auto' | 'full' | 'compact';
		rowTypeSingle?: string;
		rowTypePlural?: string;
	};
}
