import { SvelteComponentTyped } from 'svelte';
import { ColumnSettings } from '../../ColumnSettings';
import { PaginationStore } from '../../PaginationStore';

declare const __propDef: {
	props: {
		tableId: string;
		data: unknown[];
		columns: ColumnSettings<unknown>[];
		pagination: PaginationStore;
		showHeader?: boolean;
		header?: strin;
		showSortDescription?: boolean;
	};
	events: {
		sortTable: CustomEvent<never>;
	};
	slots: { [slot: string]: never };
};
export declare type DataTableProps = typeof __propDef.props;
export declare type DataTableEvents = typeof __propDef.events;
export declare type DataTableSlots = typeof __propDef.slots;
export default class DataTable extends SvelteComponentTyped<DataTableProps, DataTableEvents, DataTableSlots> {}
