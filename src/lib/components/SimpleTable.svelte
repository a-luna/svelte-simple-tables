<script lang="ts">
	import DataTable from '$lib/components/DataTable/DataTable.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { createPaginationStore } from '$lib/stores/pagination';
	import { createTableStateStore } from '$lib/stores/tableState';
	import { getDefaultTableId, getSortFunction } from '$lib/util';
	import type { ColumnSettings, PaginationStore, TableSettings, TableStateStore } from 'src/types';
	import { setContext, tick } from 'svelte';

	type R = $$Generic;

	export let data: R[] = [];
	export let columns: ColumnSettings<R>[] = [];
	export let settings: TableSettings;
	let sortFunction: (a: R, b: R) => number;
	const { showHeader, header, showSortDescription, sortBy, sortDir, paginated } = settings;
	const { pageSize, pageSizeOptions, pageNavLayout, rowTypeSingle, rowTypePlural } = settings.pagination;

	let pagination: PaginationStore = paginated
		? createPaginationStore(data.length, pageSize || 5, pageSizeOptions || [5, 10, 15])
		: createPaginationStore(data.length, data.length, [data.length]);

	let tableState: TableStateStore = createTableStateStore(
		settings.tableId ?? getDefaultTableId(),
		sortBy || '',
		sortDir || 'desc',
	);

	setContext($tableState.tableId, tableState);

	$: dataSorted = data.sort(sortFunction);
	$: dataCurrentPage = dataSorted.slice($pagination.startRow, $pagination.endRow);
	$: if ($pagination.startRow || $pagination.endRow) updateColumnWidths();

	async function handleSortTable(sortSettings: {
		propName: string;
		propType: 'string' | 'number' | 'boolean' | 'date';
		sortDir: 'asc' | 'desc';
	}) {
		const { propName, propType, sortDir } = sortSettings;
		tableState.changeSort(propName);
		tableState.changeDir(sortDir);
		sortFunction = getSortFunction<R>(propName, propType, sortDir);
		pagination.goToFirstPage();
		await updateColumnWidths();
	}

	async function updateColumnWidths() {
		await tick();
		tableState.setSync();
		await tick();
		tableState.unsetSync();
	}
</script>

<svelte:window on:resize={() => updateColumnWidths()} />

<div class="simple-table">
	<DataTable
		tableId={$tableState.tableId}
		data={dataCurrentPage}
		{columns}
		{showHeader}
		{header}
		{showSortDescription}
		{pagination}
		on:sortTable={(e) => handleSortTable(e.detail)}
	/>
	{#if settings.paginated}
		<Pagination
			totalRows={$pagination.totalRows}
			totalPages={$pagination.totalPages}
			currentPage={$pagination.currentPage}
			startRow={$pagination.startRow}
			endRow={$pagination.endRow}
			pageSize={$pagination.pageSize}
			pageSizeOptions={$pagination.pageSizeOptions}
			{pageNavLayout}
			{rowTypeSingle}
			{rowTypePlural}
			on:goToFirstPage={() => pagination.goToFirstPage()}
			on:goToPrevPage={() => pagination.goToPrevPage()}
			on:goToNextPage={() => pagination.goToNextPage()}
			on:goToLastPage={() => pagination.goToLastPage()}
			on:changePageNumber={(e) => pagination.changePageNumber(e.detail)}
			on:changePageSize={(e) => pagination.changePageSize(e.detail)}
		/>
	{/if}
</div>

<style lang="postcss">
	.simple-table {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		margin-bottom: 1rem;
		overflow-x: auto;
		white-space: nowrap;
		padding: 0px 5px;
	}

	:global(body) {
		--sst-default-text-color: hsl(210, 25%, 95%);
		--sst-default-link-text-color: hsl(210, 100%, 72%);
		--sst-default-link-hover-text-color: hsl(210, 100%, 72%);
		--sst-default-table-outer-border-color: hsl(216, 8%, 52%);
		--sst-default-table-header-text-color: hsl(210, 25%, 95%);
		--sst-default-sort-description-text-color: hsl(210, 100%, 72%);
		--sst-default-page-description-text-color: hsl(210, 100%, 72%);

		--sst-default-col-header-bg-color: hsl(220, 13%, 18%);
		--sst-default-col-header-text-color: hsl(210, 25%, 95%);
		--sst-default-col-header-padding: 3px 5px;

		--sst-default-body-even-row-bg-color: hsl(220, 23%, 5%);
		--sst-default-body-odd-row-bg-color: hsl(220, 23%, 8%);
		--sst-default-body-inner-vert-border-color: hsl(216, 8%, 32%);
		--sst-default-body-inner-horiz-border-color: hsl(216, 8%, 32%);
		--sst-default-body-highlight-sort-bg-color: current;
		--sst-default-body-highlight-sort-text-color: hsl(65, 100%, 50%);
		--sst-default-body-cell-padding: 3px 5px;

		--sst-default-button-text-color: hsl(210, 25%, 95%);
		--sst-default-button-bg-color: hsl(220, 13%, 18%);
		--sst-default-button-border-color: hsl(216, 8%, 52%);

		--sst-default-button-hover-text-color: hsl(210, 25%, 95%);
		--sst-default-button-hover-bg-color: hsl(217, 10%, 36%);
		--sst-default-button-hover-border-color: hsl(212, 13%, 77%);

		--sst-default-button-active-text-color: hsl(210, 25%, 95%);
		--sst-default-button-active-bg-color: hsl(217, 10%, 33%);
		--sst-default-button-active-border-color: hsl(214, 12%, 66%);

		--sst-default-button-disabled-text-color: hsl(0, 0%, 50%);
		--sst-default-button-disabled-bg-color: hsl(0, 0%, 25%);
		--sst-default-button-disabled-border-color: hsl(216, 8%, 52%);

		--sst-default-button-focus-border-color: hsl(212, 13%, 77%);
	}

	:global(.btn-group) {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		flex-grow: 0;
	}
</style>
