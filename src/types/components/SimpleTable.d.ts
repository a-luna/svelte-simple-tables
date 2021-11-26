import { SvelteComponentTyped } from 'svelte';
import { ColumnSettings } from '../../ColumnSettings';
import { TableSettings } from '../../TableSettings';

declare const __propDef: {
	props: {
		data: unknown[];
		columns: ColumnSettings<unknown>[] = [];
		settings: TableSettings;
	};
	events: { [event: string]: never };
	slots: { [slot: string]: never };
};
export declare type SimpleTableProps = typeof __propDef.props;
export declare type SimpleTableEvents = typeof __propDef.events;
export declare type SimpleTableSlots = typeof __propDef.slots;
export default class SimpleTable extends SvelteComponentTyped<SimpleTableProps, SimpleTableEvents, SimpleTableSlots> {}
