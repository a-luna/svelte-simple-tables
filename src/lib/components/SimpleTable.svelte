<script lang="ts">
	import DataTable from '$lib/components/DataTable/DataTable.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { createPaginationStore } from '$lib/stores/pagination';
	import { createTableStateStore } from '$lib/stores/tableState';
	import type { ColumnSettings, PaginationStore, TableSettings, TableStateStore } from '$lib/types';
	import { clearClassList, getDefaultTableId, getSortFunction } from '$lib/util';
	import { setContext, tick } from 'svelte';
	import type { Writable } from 'svelte/store';

	type R = $$Generic;

	export let data: R[] = [];
	export let columns: ColumnSettings<R>[] = [];
	export let settings: Writable<TableSettings>;
	let sortFunction: (a: R, b: R) => number;
	let tableState: TableStateStore = createTableStateStore(
		$settings.tableId || getDefaultTableId(),
		$settings.sortBy,
		$settings.sortDir,
	);
	let pagination: PaginationStore;

	const propType = columns.find((col) => col.propName === $settings.sortBy).propType;
	sortFunction = getSortFunction<R>($settings.sortBy, propType, $settings.sortDir);
	setContext($tableState.tableId, tableState);

	$: pagination = $settings.paginated
		? createPaginationStore(data.length, $settings.pageSize, $settings.pageSizeOptions)
		: createPaginationStore(data.length, data.length, [data.length]);
	$: dataCurrentPage = data.sort(sortFunction).slice($pagination.startRow, $pagination.endRow);
	$: if ($pagination.startRow || $pagination.endRow) updateColumnWidths();
	$: browser = typeof window !== 'undefined';
	$: if (browser) applyTheme($settings.themeName);

	function applyTheme(theme: 'default' | 'light' | 'dark' | 'git') {
		clearClassList(window.document.body);
		if (theme === 'light') {
			window.document.body.classList.add('light-mode');
		} else if (theme === 'dark') {
			window.document.body.classList.add('dark-mode');
		} else if (theme === 'git') {
			window.document.body.classList.add('git-light');
		} else {
			window.document.body.classList.add('default');
		}
	}

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

<div class:table-wrapper={$settings.tableWrapper} class:table-container={!$settings.tableWrapper}>
	<div class="simple-table">
		<DataTable
			tableId={$tableState.tableId}
			data={dataCurrentPage}
			{columns}
			showHeader={$settings.showHeader}
			header={$settings.header}
			showSortDescription={$settings.showSortDescription}
			{pagination}
			on:sortTable={(e) => handleSortTable(e.detail)}
		/>
		{#if $settings.paginated}
			<Pagination
				totalRows={$pagination.totalRows}
				totalPages={$pagination.totalPages}
				currentPage={$pagination.currentPage}
				startRow={$pagination.startRow}
				endRow={$pagination.endRow}
				pageSize={$pagination.pageSize}
				pageSizeOptions={$pagination.pageSizeOptions}
				pageNavLayout={$settings.pageNavLayout}
				rowTypeSingle={$settings.rowTypeSingle}
				rowTypePlural={$settings.rowTypePlural}
				on:goToFirstPage={() => pagination.goToFirstPage()}
				on:goToPrevPage={() => pagination.goToPrevPage()}
				on:goToNextPage={() => pagination.goToNextPage()}
				on:goToLastPage={() => pagination.goToLastPage()}
				on:changePageNumber={(e) => pagination.changePageNumber(e.detail)}
				on:changePageSize={(e) => pagination.changePageSize(e.detail)}
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
  .table-wrapper {
    background-color: var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));
    border: 2px dotted var(--sst-table-wrapper-border-color, var(--sst-default-table-wrapper-border-color));
    border-radius: 4px;
    max-width: 90%;
    padding: var(--sst-table-wrapper-padding, var(--sst-default-table-wrapper-padding));
		margin:0 auto 1rem auto;
  }

  .table-container {
		margin-bottom: 1rem;
  }
  
	.simple-table {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		overflow-x: auto;
		white-space: nowrap;
		padding: 0px 5px;
	}

	:global(body) {
		--sst-default-text-color: hsl(210, 25%, 95%);
		--sst-default-link-text-color: hsl(210, 100%, 72%);
		--sst-default-link-hover-text-color: hsl(210, 100%, 72%);
		--sst-default-table-outer-border-color: hsl(215, 22%, 41%);
		--sst-default-table-header-text-color: hsl(210, 25%, 95%);
    --sst-default-table-wrapper-bg-color: hsl(220, 13%, 3%);
    --sst-default-table-wrapper-padding: 1rem;
    --sst-default-table-wrapper-border-color: hsl(210, 25%, 95%);
		--sst-default-table-border-radius: 4px;
		--sst-default-sort-description-text-color: hsl(210, 100%, 72%);
		--sst-default-page-description-text-color: hsl(210, 100%, 72%);

		--sst-default-col-header-bg-color: hsl(220, 13%, 18%);
		--sst-default-col-header-text-color: hsl(210, 25%, 95%);
		--sst-default-col-header-padding: 2px 4px;
		--sst-default-col-header-inner-vert-border-color: hsl(216, 8%, 32%);
		--sst-default-col-header-bottom-border-color: hsl(215, 22%, 41%);
		--sst-default-col-header-highlight-sort-bg-color: hsl(220, 13%, 18%);
		--sst-default-col-header-highlight-sort-text-color: hsl(210, 25%, 95%);
    --sst-default-col-header-highlight-sort-vert-border-color: hsl(216, 8%, 32%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(215, 22%, 41%);

		--sst-default-body-even-row-bg-color: hsl(220, 23%, 5%);
		--sst-default-body-odd-row-bg-color: hsl(220, 23%, 8%);
		--sst-default-body-inner-vert-border-color: hsl(216, 8%, 32%);
		--sst-default-body-inner-horiz-border-color: hsl(216, 8%, 32%);
		--sst-default-body-highlight-sort-bg-color: current;
		--sst-default-body-highlight-sort-text-color: hsl(65, 100%, 50%);
		--sst-default-body-highlight-sort-border-color: hsl(216, 8%, 32%);
		--sst-default-body-cell-padding: 2px 4px;

		--sst-default-button-group-border-radius: 0.375rem;
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

  :global(body.light-mode) {
	--sst-text-color: hsl(0, 0%, 5%);
	--sst-link-text-color: hsl(218, 100%, 35%);
	--sst-link-hover-text-color: hsl(218, 100%, 35%);
	--sst-table-outer-border-color: hsl(218, 100%, 25%);
	--sst-table-header-text-color: hsl(0, 0%, 15%);
  --sst-table-wrapper-bg-color: hsl(0, 0%, 85%);
  --sst-table-wrapper-border-color: hsl(218, 100%, 25%);
  --sst-table-wrapper-padding: 1rem;
	--sst-table-border-radius: 4px;
	--sst-sort-description-text-color: hsl(113, 100%, 30%);
	--sst-page-description-text-color: hsl(113, 100%, 30%);

	--sst-col-header-bg-color: hsl(218, 100%, 25%);
	--sst-col-header-text-color: hsl(0, 0%, 85%);
	--sst-col-header-padding: 2px 4px;
	--sst-col-header-inner-vert-border-color: hsl(218, 100%, 25%);
	--sst-col-header-bottom-border-color: hsl(218, 100%, 25%);
	--sst-col-header-highlight-sort-bg-color: hsl(218, 100%, 25%);
	--sst-col-header-highlight-sort-text-color: hsl(0, 0%, 85%);
  --sst-col-header-highlight-sort-vert-border-color: hsl(218, 100%, 25%);
  --sst-col-header-highlight-sort-horiz-border-color: hsl(218, 100%, 25%);

	--sst-body-even-row-bg-color: hsl(0, 0%, 70%);
	--sst-body-odd-row-bg-color: hsl(0, 0%, 60%);
	--sst-body-inner-vert-border-color: hsl(0, 0%, 45%);
	--sst-body-inner-horiz-border-color: hsl(0, 0%, 50%);
	--sst-body-highlight-sort-bg-color: hsl(113, 100%, 40%);
	--sst-body-highlight-sort-text-color: hsl(0, 0%, 5%);
	--sst-body-highlight-sort-border-color: hsl(0, 0%, 50%);
	--sst-body-cell-padding: 2px 4px;

	--sst-button-group-border-radius: 0.375rem;
	--sst-button-text-color: hsl(0, 0%, 85%);
	--sst-button-bg-color: hsl(113, 100%, 30%);
	--sst-button-border-color: hsl(113, 100%, 30%);

	--sst-button-hover-text-color: hsl(0, 0%, 100%);
	--sst-button-hover-bg-color: hsl(113, 100%, 20%);
	--sst-button-hover-border-color: transparent;

	--sst-button-active-text-color: hsl(0, 0%, 100%);
	--sst-button-active-bg-color: hsl(113, 100%, 40%);
	--sst-button-active-border-color: transparent;

	--sst-button-disabled-text-color: hsl(0, 0%, 80%);
	--sst-button-disabled-bg-color: hsl(0, 0%, 60%);
	--sst-button-disabled-border-color: transparent;

	--sst-button-focus-border-color: transparent;
}

:global(body.dark-mode) {
  --sst-text-color: hsl(0, 0%, 5%);
  --sst-link-text-color: hsl(251deg 74% 40%);
  --sst-link-hover-text-color: hsl(251deg 74% 50%);
  --sst-table-outer-border-color: hsl(251, 74%, 30%);
  --sst-table-header-text-color: hsl(0, 0%, 95%);
  --sst-table-wrapper-bg-color: hsl(226, 27%, 10%);
  --sst-table-wrapper-border-color: hsl(251, 74%, 30%);
  --sst-table-wrapper-padding: 1rem;
  --sst-table-border-radius: 4px;
  --sst-sort-description-text-color: hsl(165, 100%, 45%);
  --sst-page-description-text-color: hsl(165, 100%, 45%);

  --sst-col-header-bg-color: hsl(251, 74%, 30%);
  --sst-col-header-text-color: hsl(0, 0%, 95%);
  --sst-col-header-padding: 2px 4px;
  --sst-col-header-inner-vert-border-color: hsl(251, 74%, 30%);
  --sst-col-header-bottom-border-color: hsl(251, 74%, 30%);
  --sst-col-header-highlight-sort-bg-color: hsl(251, 74%, 30%);
  --sst-col-header-highlight-sort-text-color: hsl(0, 0%, 95%);
  --sst-col-header-highlight-sort-vert-border-color: hsl(251, 74%, 30%);
  --sst-col-header-highlight-sort-horiz-border-color: hsl(251, 74%, 30%);

  --sst-body-even-row-bg-color: hsl(0, 0%, 50%);
  --sst-body-odd-row-bg-color: hsl(0, 0%, 45%);
  --sst-body-inner-vert-border-color: hsl(0, 0%, 30%);
  --sst-body-inner-horiz-border-color: hsl(0, 0%, 35%);
  --sst-body-highlight-sort-bg-color: hsl(165, 100%, 55%);
  --sst-body-highlight-sort-text-color: hsl(0, 0%, 5%);
  --sst-body-highlight-sort-border-color: hsl(0, 0%, 35%);
  --sst-body-cell-padding: 2px 4px;

  --sst-button-group-border-radius: 0.375rem;
  --sst-button-text-color: hsl(0, 0%, 10%);
  --sst-button-bg-color: hsl(165, 100%, 45%);
  --sst-button-border-color: hsl(165, 100%, 45%);

  --sst-button-hover-text-color: hsl(0, 0%, 0%);
  --sst-button-hover-bg-color: hsl(165, 100%, 35%);
  --sst-button-hover-border-color: transparent;

  --sst-button-active-text-color: hsl(0, 0%, 0%);
  --sst-button-active-bg-color: hsl(165, 100%, 55%);
  --sst-button-active-border-color: transparent;

  --sst-button-disabled-text-color: hsl(0, 0%, 25%)
  --sst-button-disabled-bg-color: hsl(0, 0%, 50%);
  --sst-button-disabled-border-color: transparent;

  --sst-button-focus-border-color: transparent;
}

:global(body.git-light) {
	--sst-text-color: hsl(213, 13%, 16%);
	--sst-link-text-color: hsl(216, 97%, 36%);
	--sst-link-hover-text-color: hsl(216, 97%, 36%);
	--sst-table-outer-border-color: hsl(212, 12%, 21%);
	--sst-table-header-text-color: hsl(213, 13%, 16%);
  --sst-table-wrapper-bg-color: hsl(0, 0%, 100%);
  --sst-table-wrapper-border-color: hsl(212, 12%, 21%);
  --sst-table-wrapper-padding: 1rem;
	--sst-table-border-radius: 4px;
	--sst-sort-description-text-color: hsl(7, 84%, 61%);
	--sst-page-description-text-color: hsl(7, 84%, 61%);

	--sst-col-header-bg-color: hsl(207, 23%, 92%);
	--sst-col-header-text-color: hsl(213, 13%, 16%);
	--sst-col-header-padding: 2px 4px;
	--sst-col-header-inner-vert-border-color: hsl(212, 12%, 21%);
	--sst-col-header-bottom-border-color: hsl(212, 12%, 21%);
	--sst-col-header-highlight-sort-bg-color: hsl(207, 23%, 92%);
	--sst-col-header-highlight-sort-text-color: hsl(213, 13%, 16%);
	--sst-col-header-highlight-sort-vert-border-color: hsl(212, 12%, 21%);
  --sst-col-header-highlight-sort-horiz-border-color: hsl(212, 12%, 21%);

	--sst-body-even-row-bg-color: hsl(0, 0%, 98%);
	--sst-body-odd-row-bg-color: hsl(0, 0%, 100%);
	--sst-body-inner-vert-border-color: hsl(212, 12%, 21%);
	--sst-body-inner-horiz-border-color: hsl(212, 12%, 21%);
	--sst-body-highlight-sort-bg-color: current;
	--sst-body-highlight-sort-text-color: hsl(7, 84%, 61%);
	--sst-body-highlight-sort-border-color: hsl(212, 12%, 21%);
	--sst-body-cell-padding: 2px 4px;

	--sst-button-group-border-radius: 0.375rem;
	--sst-button-text-color: hsl(213, 13%, 16%);
	--sst-button-bg-color: hsl(207, 23%, 92%);
	--sst-button-border-color: hsl(213, 13%, 16%);

	--sst-button-hover-text-color: hsl(213, 13%, 16%);
	--sst-button-hover-bg-color: hsl(210, 17%, 84%);
	--sst-button-hover-border-color: hsla(218, 80%, 2%, 0.8);

	--sst-button-active-text-color: hsl(213, 13%, 16%);
	--sst-button-active-bg-color: hsl(210, 14%, 71%);
	--sst-button-active-border-color: hsl(213, 13%, 16%);

	--sst-button-disabled-text-color: hsl(211, 10%, 57%);
	--sst-button-disabled-bg-color: hsl(207, 23%, 92%);
	--sst-button-disabled-border-color: hsl(211, 10%, 57%);

	--sst-button-focus-border-color: hsla(218, 80%, 2%, 0.8);
}

:global(.btn-group) {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  flex-grow: 0;
}
</style>
