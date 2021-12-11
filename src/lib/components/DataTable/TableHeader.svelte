<script lang="ts">
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { SortDirection, TableStateStore } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let tableId: string;
	export let showHeader: boolean = false;
	export let header: string = '';
	export let showSortDescription: boolean = false;
	let tableCaptionElement: HTMLElement;
	let tableSortDescElement: HTMLElement;
	let tableCaptionWidthStore: Writable<number>;
	let tableSortDescWidthStore: Writable<number>;
	const tableState: TableStateStore = getContext(tableId);

	$: if (typeof window !== 'undefined') tableCaptionWidthStore = syncWidth(tableCaptionElement);
	$: if (typeof window !== 'undefined') tableSortDescWidthStore = syncWidth(tableSortDescElement);
	$: if (typeof window !== 'undefined') tableState.updateCaptionWidth($tableCaptionWidthStore);
	$: if (typeof window !== 'undefined') tableState.updateSortDescriptionWidth($tableSortDescWidthStore);

	const describeSortSetting = (headerText: string, sortDir: SortDirection): string =>
		`Sorted by: ${headerText.split('_').join(' ')} (${sortDir === 'asc' ? 'ascending' : 'descending'})`;
</script>

<div class="table-header-wrapper">
	{#if showHeader}
		<h3
			id="{$tableState.tableId}-caption"
			class="resp-table-caption"
			data-testid="{$tableState.tableId}-caption"
			bind:this={tableCaptionElement}
		>
			{header}
		</h3>
	{/if}
	{#if showSortDescription && $tableState.sortBy}
		<div
			id="{$tableState.tableId}-sort-description"
			class="sort-description"
			data-testid="{$tableState.tableId}-sort-description"
			bind:this={tableSortDescElement}
		>
			{describeSortSetting($tableState.sortBy, $tableState.sortDir)}
		</div>
	{/if}
</div>

<style lang="postcss">
	.table-header-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: baseline;
	}

	.resp-table-caption {
		display: table-caption;
		color: var(--sst-table-header-text-color, var(--sst-default-table-header-text-color));
		font-size: var(--sst-table-header-font-size, var(--sst-default-table-header-font-size));
		font-weight: 500;
		letter-spacing: 0.025em;
		line-height: 1;
		white-space: nowrap;
		margin: 0 0 0.375em;
	}

	.sort-description {
		color: var(--sst-sort-description-text-color, var(--sst-default-sort-description-text-color));
		font-size: var(--sst-sort-description-font-size, var(--sst-default-sort-description-font-size));
		line-height: 1;
		font-style: italic;
		margin-bottom: 0.8em;
	}
</style>
