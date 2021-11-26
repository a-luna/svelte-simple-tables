import { SvelteComponentTyped } from 'svelte';
import { PaginationStore } from '../../PaginationStore';

declare const __propDef: {
	props: {
		pagination: PaginationStore;
	};
	events: {
		pageChanged: CustomEvent<never>;
	};
	slots: { [slot: string]: never };
};
export declare type PageNavigationCompactProps = typeof __propDef.props;
export declare type PageNavigationCompactEvents = typeof __propDef.events;
export declare type PageNavigationCompactSlots = typeof __propDef.slots;
export default class PageNavigationCompact extends SvelteComponentTyped<
	PageNavigationCompactProps,
	PageNavigationCompactEvents,
	PageNavigationCompactSlots
> {}
