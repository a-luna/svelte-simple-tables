export type AriaSort = 'ascending' | 'descending' | 'none' | 'other';
export type BreakPoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type PageRangeFormat = 'none' | 'compact' | 'verbose' | 'auto';
export type PaginationLayout = 'compact' | 'full' | 'auto';
export type PropType = 'string' | 'number' | 'boolean' | 'date' | 'unsorted';
export type SortDirection = 'asc' | 'desc';
export type SyncState =
	| 'not-started'
	| 'started-sort-table'
	| 'finished-sort-table'
	| 'started-resize-columns'
	| 'finished-resize-columns';
export type TableLayout = 'auto' | 'fixed';
export type TableTheme = 'light' | 'lighter' | 'dark' | 'darker' | 'custom';
