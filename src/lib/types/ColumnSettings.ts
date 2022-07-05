import type { PropType } from './literals';

export interface ColumnSettings<T> {
	propName: keyof T;
	propType: PropType;
	headerText?: string;
	tooltip?: string;
	sortable?: boolean;
	classList?: string[];
	colValue?: (obj: T) => string;
}
