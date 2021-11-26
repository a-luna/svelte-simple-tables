import { SvelteComponentTyped } from 'svelte';

declare const __propDef: {
	props: {
		tableId: string;
		obj: unknown;
		propName: string;
		classList?: string[];
		colValue?: (obj: unknown) => string;
	};
	events: { [event: string]: never };
	slots: { [slot: string]: never };
};
export declare type TableCellProps = typeof __propDef.props;
export declare type TableCellEvents = typeof __propDef.events;
export declare type TableCellSlots = typeof __propDef.slots;
export default class TableCell extends SvelteComponentTyped<TableCellProps, TableCellEvents, TableCellSlots> {}
