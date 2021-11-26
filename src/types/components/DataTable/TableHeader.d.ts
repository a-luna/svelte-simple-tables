import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		tableId: string;
		showHeader: boolean;
		showSortDescription: boolean;
		heading: string;
	};
	events: { [event: string]: never };
	slots: { [slot: string]: never };
};
export declare type TableHeaderProps = typeof __propDef.props;
export declare type TableHeaderEvents = typeof __propDef.events;
export declare type TableHeaderSlots = typeof __propDef.slots;
export default class TableHeader extends SvelteComponentTyped<TableHeaderProps, TableHeaderEvents, TableHeaderSlots> {}
