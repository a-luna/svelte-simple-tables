import { SvelteComponentTyped } from 'svelte';
import { PaginationStore } from '../../PaginationStore';

declare const __propDef: {
	props: {
		pagination: PaginationStore;
		pageNavLayout: 'auto' | 'full' | 'compact';
		rowTypeSingle: string;
		rowTypePlural: string;
	};
	events: { [event: string]: never };
	slots: { [slot: string]: never };
};
export declare type PaginationProps = typeof __propDef.props;
export declare type PaginationEvents = typeof __propDef.events;
export declare type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponentTyped<PaginationProps, PaginationEvents, PaginationSlots> {}
