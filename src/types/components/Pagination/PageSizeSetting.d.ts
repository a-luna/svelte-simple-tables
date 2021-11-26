import { SvelteComponentTyped } from 'svelte';
import { PaginationStore } from '../../PaginationStore';

declare const __propDef: {
	props: {
		pagination: PaginationStore;
	};
	events: {
		pageSizeChanged: CustomEvent<never>;
	};
	slots: { [slot: string]: never };
};
export declare type PageSizeSettingProps = typeof __propDef.props;
export declare type PageSizeSettingEvents = typeof __propDef.events;
export declare type PageSizeSettingSlots = typeof __propDef.slots;
export default class PageSizeSetting extends SvelteComponentTyped<
	PageSizeSettingProps,
	PageSizeSettingEvents,
	PageSizeSettingSlots
> {}
