import { SvelteComponentTyped } from 'svelte';

declare const __propDef: {
	props: {
		tableId: string;
		propName: string;
		propType: 'string' | 'number' | 'boolean' | 'date';
		displayName?: string;
		tooltip?: string;
		sortable?: boolean;
	};
	events: {
		sortTable: CustomEvent<never>;
	};
	slots: { [slot: string]: never };
};
export declare type ColumnHeaderProps = typeof __propDef.props;
export declare type ColumnHeaderEvents = typeof __propDef.events;
export declare type ColumnHeaderSlots = typeof __propDef.slots;
export default class ColumnHeader extends SvelteComponentTyped<
	ColumnHeaderProps,
	ColumnHeaderEvents,
	ColumnHeaderSlots
> {}
