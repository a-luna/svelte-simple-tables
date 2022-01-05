<script lang="ts">
	import type { AriaAttributes } from '$lib/types';

	export let label = '';
	export let active: boolean = null;
	export let disabled: boolean = null;
	export let title: string = label || null;
	export let classList: string[] = [];
	export let aria: AriaAttributes = {};
	export let testId: string = null;
</script>

<button
	on:click
	type="button"
	{...aria}
	{title}
	{disabled}
	class:active
	class:disabled
	class="sst-btn{classList.length > 0 ? ` ${classList.join(' ')}` : ''}"
	data-testid={testId}
>
	{label}
</button>

<style lang="postcss">
	.sst-btn {
		cursor: pointer;
		color: var(--sst-button-text-color, var(--sst-default-button-text-color));
		background-color: var(--sst-button-bg-color, var(--sst-default-button-bg-color));
		border-top: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-bottom: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-left: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-right: none;
		background-position: center;
		transition: background 0.2s;
		margin: 0px;
		padding: 0.25em 0.5em;
		white-space: nowrap;
		overflow: hidden;
		font-size: 1em;
		line-height: 1.5em;
		font-weight: 500;
		letter-spacing: 0.025em;
		border-radius: 0px;
		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.sst-btn:first-child {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		border-top-left-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius, 4px));
		border-bottom-left-radius: var(
			--sst-button-group-border-radius,
			var(--sst-default-button-group-border-radius, 4px)
		);
	}

	.sst-btn:last-child {
		border-right: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-top-right-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius, 4px));
		border-bottom-right-radius: var(
			--sst-button-group-border-radius,
			var(--sst-default-button-group-border-radius, 4px)
		);
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.sst-btn:hover {
		color: var(--sst-button-hover-text-color, var(--sst-default-button-hover-text-color));
		background-color: var(--sst-button-hover-bg-color, var(--sst-default-button-hover-bg-color));
		border-top: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
		border-bottom: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
		border-left: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	.sst-btn:hover:last-child {
		border-right: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	.sst-btn.active {
		color: var(--sst-button-active-text-color, var(--sst-default-button-active-text-color));
		background-color: var(--sst-button-active-bg-color, var(--sst-default-button-active-bg-color));
		border-top: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		border-bottom: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		border-left: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		background-size: 100%;
		transition: background 0.1s;
	}

	.sst-btn.active:last-child {
		border-right: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
	}

	.sst-btn:focus {
		border-top: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		border-bottom: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		border-left: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	.sst-btn:focus:last-child {
		border-right: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
	}

	.sst-btn.disabled,
	.sst-btn:disabled,
	.sst-btn:disabled:hover {
		color: var(--sst-button-disabled-text-color, var(--sst-default-button-disabled-text-color));
		background-color: var(--sst-button-disabled-bg-color, var(--sst-default-button-disabled-bg-color));
		border-top: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		border-bottom: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		border-left: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		cursor: default;
	}

	.sst-btn.disabled:last-child,
	.sst-btn:disabled:last-child,
	.sst-btn:disabled:hover:last-child {
		border-right: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
	}

	.sst-btn.symbol {
		width: 30px;
		height: 30px;
		font-size: 14px;
		padding: 0;
	}

	.sst-btn.symbol:nth-child(2) {
		border-right: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
	}

	.sst-btn.symbol:nth-child(2):hover {
		border-right: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	.sst-btn.symbol:nth-child(2).active {
		border-right: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
	}

	.sst-btn.symbol:nth-child(2):focus {
		border-right: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
	}

	.sst-btn.symbol:nth-child(2).disabled,
	.sst-btn.symbol:nth-child(2):disabled,
	.sst-btn.symbol:nth-child(2):disabled:hover {
		border-right: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
	}

	.sst-btn.symbol.disabled.no-page-nav:nth-child(2),
	.sst-btn.symbol.no-page-nav:nth-child(2):disabled,
	.sst-btn.symbol.no-page-nav:nth-child(2):disabled:hover {
		border-right: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
	}

	.sst-btn.symbol:nth-child(3) {
		border-left: none;
	}

	.sst-btn.text {
		line-height: 1;
		font-size: 0.9em;
		width: 75px;
		height: 30px;
	}

	.sst-btn.text:last-child {
		border-left: none;
	}

	.sst-btn.number {
		line-height: 1;
		font-size: 0.9em;
		width: 30px;
		height: 30px;
	}

	.sst-btn.number:nth-last-child(2) {
		border-right: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
	}

	.sst-btn.number:nth-last-child(2):hover {
		border-right: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	.sst-btn.number:nth-last-child(2).active {
		border-right: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
	}

	.sst-btn.number:nth-last-child(2):focus {
		border-right: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
	}

	.sst-btn.number:nth-last-child(2).disabled,
	.sst-btn.number:nth-last-child(2):disabled,
	.sst-btn.number:nth-last-child(2):disabled:hover {
		border-right: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
	}

	.sst-btn.page-size {
		line-height: 1;
		font-weight: 500;
		width: 26px;
		height: 26px;
		font-size: 12px;
		padding: 0;
	}

	@media screen and (min-width: 1024px) {
		.sst-btn.text {
			font-size: 0.95em;
			width: 85px;
			height: 35px;
		}

		.sst-btn.number {
			font-size: 0.95em;
			width: 35px;
			height: 35px;
		}
	}
</style>
