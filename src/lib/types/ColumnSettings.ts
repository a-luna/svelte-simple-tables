import type { PropType } from './literals';

export interface ColumnSettings<T> {
	propName: string;
	propType: PropType;
	headerText?: string;
	tooltip?: string;
	sortable?: boolean;
	classList?: string[];
	colValue?: (obj: T) => string;
}
