<script lang="ts">
	import { describeSortSetting } from '$lib/util';
	import type { TableStateStore } from 'src/types';
	import { getContext } from 'svelte';

	export let tableId: string;
	export let showHeader: boolean = false;
	export let header: string = '';
	export let showSortDescription: boolean = false;
	const tableState: TableStateStore = getContext(tableId);
</script>

<div class="table-header-wrapper">
	{#if showHeader}
		<h3 id="{$tableState.tableId}-cap" class="resp-table-caption" data-testid="{$tableState.tableId}-cap">{header}</h3>
	{/if}
	{#if showSortDescription && $tableState.sortBy}
		<div class="sort-description" data-testid="{$tableState.tableId}-sort-description">
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
		display: resp-table-caption;
		color: var(--sst-table-header-text-color, var(--sst-default-table-header-text-color));
		font-size: 1.125rem;
		letter-spacing: 0.025em;
		line-height: 1;
		white-space: nowrap;
		margin-bottom: 0.375rem;
	}

	.sort-description {
		color: var(--sst-sort-description-text-color, var(--sst-default-sort-description-text-color));
		font-size: 0.875rem;
		line-height: 1;
		font-style: italic;
		margin-bottom: 0.375rem;
	}

	@media screen and (min-width: 640px) {
		.resp-table-caption {
			font-size: 1.25rem;
		}
	}
</style>
