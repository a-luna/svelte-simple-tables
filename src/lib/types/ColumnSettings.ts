export interface ColumnSettings<T> {
	propName: keyof T;
	headerText?: string;
	tooltip?: string;
	sortable?: boolean;
	classList?: string[];
	colValue?: (obj: T) => string;
}
