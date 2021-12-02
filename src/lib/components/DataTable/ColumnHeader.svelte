<script lang="ts">
	import SortAscending from '$lib/components/Icons/SortAscending.svelte';
	import SortDescending from '$lib/components/Icons/SortDescending.svelte';
	import { breakPoints } from '$lib/stores/breakPoints';
	import type { BreakPoint, TableStateStore } from '$lib/types';
	import { capitalizeSentence, getColumnWidth } from '$lib/util';
	import { createEventDispatcher, getContext } from 'svelte';

	export let tableId: string;
	export let propName: string;
	export let propType: string;
	export let headerText: string = defaultColHeader();
	export let tooltip: string = defaultColHeader();
	export let sortable: boolean = true;
	let width: string = '';
	const dispatch = createEventDispatcher();
	const tableState: TableStateStore = getContext(tableId);
	let ariaSort: 'ascending' | 'descending' | 'none' | 'other' = null;

	$: if ($tableState.tableSync) width = getPaddedColumnWidth();
	$: currentBreakPoint = $breakPoints.current as BreakPoint;
	$: asc = sortable && $tableState.sortBy === propName && $tableState.sortDir === 'asc';
	$: desc = sortable && $tableState.sortBy === propName && $tableState.sortDir === 'desc';
	$: ariaSort = getAriaSortValue($tableState.sortBy, $tableState.sortDir);

	function defaultColHeader(): string {
		return capitalizeSentence(propName.split('_').join(' '));
	}

	function getPaddedColumnWidth(): string {
		const colWidth = getColumnWidth(tableId, propName, $tableState.sortBy, currentBreakPoint);
		const colPadding = `(${$tableState.cellPadding} * 2)`;
		return `calc(${colWidth}px + ${colPadding})`;
	}

	function toggleSort() {
		if (sortable) {
			const sortDir = $tableState.sortBy !== propName ? 'desc' : $tableState.sortDir === 'asc' ? 'desc' : 'asc';
			dispatch('sortTable', { propName, propType, sortDir });
		}
	}

	const getAriaSortValue = (sortBy: string, sortDir: 'asc' | 'desc') =>
		sortBy !== propName ? null : sortDir === 'asc' ? 'ascending' : 'descending';
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
	style={width ? ` width: ${width}` : ''}
	data-testid="{$tableState.tableId}-toggle-{propName}"
	on:click={() => toggleSort()}
>
	<div class="header-content-wrapper">
		<span class="header-content{sortable ? ' underline' : ''}">{headerText}</span>
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
		cursor: pointer;
		color: var(--sst-col-header-text-color, var(--sst-default-col-header-text-color));
		background-color: var(--sst-col-header-bg-color, var(--sst-default-col-header-bg-color));
		border-top: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
		border-left: 1px solid
			var(--sst-col-header-inner-vert-border-color, var(--sst-default-col-header-inner-vert-border-color));
		border-bottom: 1px solid
			var(--sst-col-header-bottom-border-color, var(--sst-default-col-header-bottom-border-color));
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

	.header-content-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		column-gap: 0.25rem;
	}

	.asc,
	.desc {
		color: var(--sst-col-header-highlight-sort-text-color, var(--sst-default-col-header-highlight-sort-text-color));
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
		flex: 0 0 1rem;
		display: flex;
		flex-flow: column;
		justify-content: center;
		font-size: 0.5rem;
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
