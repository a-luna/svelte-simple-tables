export interface ColumnSettings<T> {
	propName: string;
	propType: 'string' | 'number' | 'boolean' | 'date';
	headerText?: string;
	tooltip?: string;
	sortable?: boolean;
	classList?: string[];
	colValue?: (obj: T) => string;
}
