<script lang="ts">
	import SortAscending from '$lib/components/Icons/SortAscending.svelte';
	import SortDescending from '$lib/components/Icons/SortDescending.svelte';
	import { getTableState } from '$lib/context';
	import type { AriaSort, SortDirection } from '$lib/types';
	import { getColumnWidth, getDefaultColHeader } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	type R = $$Generic;

	export let tableId: string;
	export let propName: keyof R;
	export let propType: string;
	export let headerText: string = getDefaultColHeader<R>(propName);
	export let tooltip: string = getDefaultColHeader<R>(propName);
	export let sortable = true;
	let width: string;
	const dispatch = createEventDispatcher();
	const tableState = getTableState(tableId);
	let ariaSort: AriaSort = null;

	$: if ($tableState.state.syncState === 'started-resize-columns')
		width = `${getColumnWidth<R>(tableId, propName, $tableState.sortBy)}px`;
	$: asc = sortable && $tableState.sortBy === propName && $tableState.sortDir === 'asc';
	$: desc = sortable && $tableState.sortBy === propName && $tableState.sortDir === 'desc';
	$: ariaSort = getAriaSortValue($tableState.sortBy, $tableState.sortDir);

	const getAriaSortValue = (sortBy: string, sortDir: SortDirection) =>
		sortBy !== propName ? null : sortDir === 'asc' ? 'ascending' : 'descending';

	function handleColumnHeaderClicked() {
		if (sortable) {
			dispatch('sortTable', { propName, propType });
		}
	}
</script>

<div
	role="columnheader"
	aria-sort={ariaSort}
	class="table-header-cell"
	class:sortable
	class:asc
	class:desc
	data-stat-name={propName}
	title={tooltip}
	data-testid="{$tableState.tableId}-toggle-{String(propName)}"
	tabindex="0"
	on:click={() => handleColumnHeaderClicked()}
>
	<div class="header-content-wrapper" style={width ? ` width: ${width}` : ''}>
		<span class="header-content">{headerText}</span>
		{#if asc}
			<div class="asc_icon">
				<SortAscending />
			</div>
		{:else if desc}
			<div class="desc_icon">
				<SortDescending />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.table-header-cell {
		display: table-cell;
		text-align: center;
		font-weight: var(--sst-col-header-text-weight, var(--sst-default-col-header-text-weight));
		color: var(--sst-col-header-text-color, var(--sst-default-col-header-text-color));
		background-color: var(--sst-col-header-bg-color, var(--sst-default-col-header-bg-color));
		border-top: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
		border-left: 1px solid var(--sst-col-header-vert-border-color, var(--sst-default-col-header-vert-border-color));
		border-bottom: 1px solid var(--sst-col-header-horiz-border-color, var(--sst-default-col-header-horiz-border-color));
		padding: var(--sst-col-header-padding, var(--sst-default-col-header-padding));
	}

	.table-header-cell:first-child {
		border-top-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-left: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.table-header-cell:last-child {
		border-top-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-right: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.sortable {
		cursor: pointer;
	}

	.header-content-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		column-gap: 0.25em;
	}

	.asc,
	.desc {
		color: var(--sst-col-header-highlight-sort-text-color, var(--sst-default-col-header-highlight-sort-text-color));
		font-weight: var(--sst-col-header-highlight-text-weight, var(--sst-default-col-header-highlight-text-weight));
		background-color: var(
			--sst-col-header-highlight-sort-bg-color,
			var(--sst-default-col-header-highlight-sort-bg-color)
		);
		border-top: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
		border-left: 1px solid
			var(
				--sst-col-header-highlight-sort-vert-border-color,
				var(--sst-default-col-header-highlight-sort-vert-border-color)
			);
		border-bottom: 1px solid
			var(
				--sst-col-header-highlight-sort-horiz-border-color,
				var(--sst-default-col-header-highlight-sort-horiz-border-color)
			);
	}

	.asc:first-child,
	.desc:first-child {
		border-left: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.asc:last-child,
	.desc:last-child {
		border-right: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.asc_icon,
	.desc_icon {
		flex: 0 0 1em;
		display: flex;
		flex-flow: column;
		justify-content: center;
		font-size: 1em;
		stroke: currentColor;
		stroke-width: 2;
		cursor: pointer;
		line-height: 1;
		margin: 0 0 0 auto;
		color: var(--sst-col-header-highlight-sort-text-color, var(--sst-default-col-header-highlight-sort-text-color));
		background-color: var(
			--sst-col-header-highlight-sort-bg-color,
			var(--sst-default-col-header-highlight-sort-bg-color)
		);
	}
</style>
