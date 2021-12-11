<script lang="ts">
	import ColumnHeader from '$lib/components/DataTable/ColumnHeader.svelte';
	import TableCell from '$lib/components/DataTable/TableCell.svelte';
	import TableHeader from '$lib/components/DataTable/TableHeader.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { ColumnSettings, PaginationStore, TableLayout, TableStateStore } from '$lib/types';
	import { getContext } from 'svelte';

	type R = $$Generic;

	export let tableId: string;
	export let data: R[] = [];
	export let columnSettings: ColumnSettings<R>[] = [];
	export let tableLayout: TableLayout;
	export let fullWidth: boolean = false;
	export let pagination: PaginationStore;
	export let showHeader: boolean = false;
	export let header: string = '';
	export let showSortDescription: boolean = false;
	let tableElement: HTMLElement;
	const tableState: TableStateStore = getContext(tableId);

	$: tableWidthStore = syncWidth(tableElement);
	$: tableState.updateTableWidth($tableWidthStore);
</script>

<TableHeader {tableId} {header} {showHeader} {showSortDescription} />
<article class="resp-table-container">
	<div class="resp-table-wrapper">
		<div
			id={$tableState.tableId}
			role="table"
			aria-labelledby="{$tableState.tableId}-cap"
			aria-rowcount={$pagination.totalRows}
			class="resp-table"
			class:auto-layout={tableLayout === 'auto'}
			class:fixed-layout={tableLayout === 'fixed'}
			class:full-width={fullWidth}
			data-testid={$tableState.tableId}
			bind:this={tableElement}
		>
			<div role="row" class="resp-table-header">
				{#each columnSettings as { propName, propType, headerText, tooltip, sortable }}
					<ColumnHeader
						tableId={$tableState.tableId}
						{propName}
						{propType}
						{headerText}
						{tooltip}
						{sortable}
						on:sortTable
					/>
				{/each}
			</div>
			<div role="rowgroup" class="resp-table-body">
				{#each data as obj, i}
					<div
						role="row"
						class="text-right resp-table-row"
						aria-rowindex={$pagination.startRow + i + 1}
						data-testid="{$tableState.tableId}-row"
					>
						{#each columnSettings as { propName, classList, colValue }}
							<TableCell tableId={$tableState.tableId} {obj} {propName} {classList} {colValue} />
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.resp-table-container {
		overflow-x: auto;
		white-space: nowrap;
		border-top-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-top-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.resp-table-wrapper {
		display: inline-block;
	}

	.resp-table {
		display: table;
		color: var(--sst-text-color, var(--sst-default-text-color));
		line-height: 1.25em;
		margin: 0 auto;
	}

	.full-width {
		width: 100%;
	}

	.auto-layout {
		table-layout: auto;
	}

	.fixed-layout {
		table-layout: fixed;
	}

	.resp-table-header {
		display: table-header-group;
		text-align: center;
	}

	.resp-table-body {
		display: table-row-group;
	}

	.resp-table-body :global(a) {
		text-decoration: none;
		color: var(--sst-link-text-color, var(--sst-default-link-text-color));
	}

	.resp-table-body :global(a:hover) {
		text-decoration: underline;
		color: var(--sst-link-hover-text-color, var(--sst-default-link-hover-text-color));
	}

	.resp-table-row {
		display: table-row;
	}

	.resp-table-row:nth-child(even) {
		background-color: var(--sst-body-even-row-bg-color, var(--sst-default-body-even-row-bg-color));
	}

	.resp-table-row:nth-child(odd) {
		background-color: var(--sst-body-odd-row-bg-color, var(--sst-default-body-odd-row-bg-color));
	}

	.resp-table-row:last-child {
		border-bottom-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-bottom-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}
</style>
