import { SvelteComponentTyped } from 'svelte';
import { PaginationStore } from '../../PaginationStore';

declare const __propDef: {
	props: {
		pagination: PaginationStore;
		rowTypeSingle: string;
		rowTypePlural: string;
		pageNavLayout: 'auto' | 'full' | 'compact';
	};
	events: { click: CustomEvent<> };
	slots: { [slot: string]: never };
};
export declare type PageRangeDescriptionProps = typeof __propDef.props;
export declare type PageRangeDescriptionEvents = typeof __propDef.events;
export declare type PageRangeDescriptionSlots = typeof __propDef.slots;
export default class PageRangeDescription extends SvelteComponentTyped<
	PageRangeDescriptionProps,
	PageRangeDescriptionEvents,
	PageRangeDescriptionSlots
> {}
