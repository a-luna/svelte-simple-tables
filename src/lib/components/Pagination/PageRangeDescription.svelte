<script lang="ts">
	import SettingsIcon from '$lib/components/Icons/SettingsIcon.svelte';
	import { pageWidth } from '$lib/stores/pageWidth';
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { PageRangeFormat, TableStateStore } from '$lib/types';
	import { getContext } from 'svelte';

	export let tableId: string;
	export let totalRows: number;
	export let startRow: number;
	export let endRow: number;
	export let rowType: string;
	export let pageRangeFormat: PageRangeFormat;
	let pageDescriptionElement: HTMLElement;
	const tableState: TableStateStore = getContext(tableId);

	$: fontSize = $pageWidth.current < 1024 ? '1em' : '1.05em';
	$: pageDescWidthStore = syncWidth(pageDescriptionElement);
	$: tableState.updatePaginationLeftWidth($pageDescWidthStore);
</script>

<div
	id="{tableId}-page-size"
	class="pagination-description"
	data-testid="change-page-size"
	bind:this={pageDescriptionElement}
	on:click
>
	<div class="change-settings-icon" title="Click to change # of rows displayed per page">
		<SettingsIcon />
	</div>
	<aside title="Click to change # of rows displayed per page" style="font-size: {fontSize}">
		<div class="current-page-range" data-testid="page-range">
			{#if pageRangeFormat === 'compact' || (pageRangeFormat === 'auto' && $pageWidth.isMobileDisplay)}
				<b>{startRow + 1}-{endRow}/{totalRows}</b>
			{:else if pageRangeFormat === 'verbose' || (pageRangeFormat === 'auto' && !$pageWidth.isMobileDisplay)}
				Showing <b>{startRow + 1}</b> to <b>{endRow}</b> of <b>{totalRows}</b> {rowType}
			{/if}
		</div>
	</aside>
</div>

<style lang="postcss">
	.pagination-description {
		color: var(--sst-page-range-description-text-color, var(--sst-default-page-range-description-text-color));
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		gap: 0.25em;
		line-height: 1;
		cursor: pointer;
	}

	.change-settings-icon {
		display: block;
		margin-bottom: 0.125em;
		stroke: currentColor;
		stroke-width: 2;
		width: 1.25em;
		height: 1em;
	}

	.current-page-range {
		display: inline-block;
	}
</style>
