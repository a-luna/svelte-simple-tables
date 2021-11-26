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
export declare type PageNavigationProps = typeof __propDef.props;
export declare type PageNavigationEvents = typeof __propDef.events;
export declare type PageNavigationSlots = typeof __propDef.slots;
export default class PageNavigation extends SvelteComponentTyped<
	PageNavigationProps,
	PageNavigationEvents,
	PageNavigationSlots
> {}
