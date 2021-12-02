<script lang="ts">
	import type { AriaAttributes } from '$lib/types';

	export let label: string = '';
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
	class="btn{classList.length > 0 ? ` ${classList.join(' ')}` : ''}"
	data-testid={testId}
>
	{label}
</button>

<style lang="postcss">
	button {
		color: var(--sst-button-text-color, var(--sst-default-button-text-color));
		background-color: var(--sst-button-bg-color, var(--sst-default-button-bg-color));
		border-top: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-bottom: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-left: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-right: none;
		background-position: center;
		transition: background 0.2s;
		margin: 0px;
		padding: 0.25rem 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 500;
		letter-spacing: 0.025em;
		border-radius: 0px;
		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	button:first-child {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		border-top-left-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius));
		border-bottom-left-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius));
	}

	button:last-child {
		border-right: 1px solid var(--sst-button-border-color, var(--sst-default-button-border-color));
		border-top-right-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius));
		border-bottom-right-radius: var(--sst-button-group-border-radius, var(--sst-default-button-group-border-radius));
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	button:hover {
		color: var(--sst-button-hover-text-color, var(--sst-default-button-hover-text-color));
		background-color: var(--sst-button-hover-bg-color, var(--sst-default-button-hover-bg-color));
		border-top: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
		border-bottom: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
		border-left: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	button:hover:last-child {
		border-right: 1px solid var(--sst-button-hover-border-color, var(--sst-default-button-hover-border-color));
	}

	button.active {
		color: var(--sst-button-active-text-color, var(--sst-default-button-active-text-color));
		background-color: var(--sst-button-active-bg-color, var(--sst-default-button-active-bg-color));
		border-top: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		border-bottom: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		border-left: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
		cursor: default;
		background-size: 100%;
		transition: background 0.1s;
	}

	button.active:last-child {
		border-right: 1px solid var(--sst-button-active-border-color, var(--sst-default-button-active-border-color));
	}

	button:focus {
		border-top: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		border-bottom: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		border-left: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	button:focus:last-child {
		border-right: 1px solid var(--sst-button-focus-border-color, var(--sst-default-button-focus-border-color));
	}

	button.disabled,
	button:disabled,
	button:disabled:hover {
		color: var(--sst-button-disabled-text-color, var(--sst-default-button-disabled-text-color));
		background-color: var(--sst-button-disabled-bg-color, var(--sst-default-button-disabled-bg-color));
		border-top: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		border-bottom: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		border-left: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
		cursor: default;
	}

	button.disabled:last-child,
	button:disabled:last-child,
	button:disabled:hover:last-child {
		border-right: 1px solid var(--sst-button-disabled-border-color, var(--sst-default-button-disabled-border-color));
	}

	button.symbol {
		width: 30px;
		height: 30px;
		font-size: 14px;
		padding: 0;
	}

	button.text {
		line-height: 1;
		font-size: 0.9rem;
		width: 75px;
		height: 30px;
	}

	button.number {
		line-height: 1;
		font-size: 0.9rem;
		width: 30px;
		height: 30px;
	}

	button.page-size {
		line-height: 1;
		font-weight: 600;
		width: 24px;
		height: 23px;
		font-size: 11px;
		padding: 0;
	}

	@media screen and (min-width: 1024px) {
		button.text {
			font-size: 0.95rem;
			width: 85px;
			height: 35px;
		}

		button.number {
			font-size: 0.95rem;
			width: 35px;
			height: 35px;
		}
	}
</style>
