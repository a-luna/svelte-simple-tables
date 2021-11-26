import { SvelteComponentTyped } from 'svelte';
import type { AriaAttributes } from '../../AriaAttributes';

declare const __propDef: {
	props: {
		label: string;
		active?: boolean;
		disabled?: boolean;
		title?: string;
		classList?: string[];
		aria?: AriaAttributes;
		testId?: string;
	};
	events: {
		click: CustomEvent<unknown>;
	};
	slots: { [slot: string]: never };
};
export declare type ButtonProps = typeof __propDef.props;
export declare type ButtonEvents = typeof __propDef.events;
export declare type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {}
