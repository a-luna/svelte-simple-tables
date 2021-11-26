<script lang="ts">
	import ColumnHeader from '$lib/components/DataTable/ColumnHeader.svelte';
	import TableCell from '$lib/components/DataTable/TableCell.svelte';
	import TableHeader from '$lib/components/DataTable/TableHeader.svelte';
	import type { ColumnSettings, PaginationStore, TableStateStore } from 'src/types';
	import { getContext } from 'svelte';

	type R = $$Generic;

	export let tableId: string;
	export let data: R[] = [];
	export let columns: ColumnSettings<R>[] = [];
	export let pagination: PaginationStore;
	export let showHeader: boolean = false;
	export let header: string = '';
	export let showSortDescription: boolean = false;

	const tableState: TableStateStore = getContext(tableId);
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
			data-testid={$tableState.tableId}
		>
			<div role="row" class="resp-table-header">
				{#each columns as { propName, propType, displayName, tooltip, sortable }}
					<ColumnHeader
						tableId={$tableState.tableId}
						{propName}
						{propType}
						{displayName}
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
						{#each columns as { propName, classList, colValue }}
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
		width: 100%;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		padding-bottom: 0.5rem;
	}

	.resp-table-wrapper {
		display: inline-block;
		width: 100%;
	}

	.resp-table {
		display: table;
		table-layout: fixed;
		width: 100%;
		color: var(--sst-text-color, var(--sst-default-text-color));
		font-size: 0.875rem;
		line-height: 1.25rem;
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
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>
