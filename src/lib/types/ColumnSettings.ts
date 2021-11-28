export interface ColumnSettings<T> {
	propName: string;
	propType: 'string' | 'number' | 'boolean' | 'date';
	displayName?: string;
	tooltip?: string;
	sortable?: boolean;
	classList?: string[];
	colValue?: (obj: T) => string;
}
