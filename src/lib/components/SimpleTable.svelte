<script lang="ts">
	import DataTable from '$lib/components/DataTable/DataTable.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { createComponentWidthStore } from '$lib/stores/componentWidth';
	import { createPaginationStore } from '$lib/stores/pagination';
	import { createTableSettingsStore } from '$lib/stores/tableSettings';
	import { createTableStateStore } from '$lib/stores/tableState';
	import type { ColumnSettings, PropType, SortDirection, TableSettings, TableStateStore } from '$lib/types';
	import { getBorderCssValues, getSortFunction, getTableFontSize } from '$lib/util';
	import { setContext, tick } from 'svelte';

	type R = $$Generic;

	export let data: R[] = [];
	export let columnSettings: ColumnSettings<R>[] = [];
	export let tableSettings: TableSettings = {};
	let settings = createTableSettingsStore(tableSettings);
	let tableState: TableStateStore = createTableStateStore(settings);
	setContext($tableState.tableId, tableState);
	const componentWidth = createComponentWidthStore(settings, tableState);
	const propType = columnSettings.find((col) => col.propName === $settings.sortBy)?.propType || 'unsorted';
	let sortFunction: (a: R, b: R) => number = getSortFunction<R>($settings.sortBy, propType, $settings.sortDir);

	$: fontSize = getTableFontSize($tableState.tableId);
	$: pagination = $settings.paginated
		? createPaginationStore(data.length, $settings.pageSize, $settings.pageSizeOptions)
		: createPaginationStore(data.length, data.length, [data.length]);
	$: dataCurrentPage = data.sort(sortFunction).slice($pagination.startRow, $pagination.endRow);
	$: if ($pagination.startRow || $pagination.endRow) updateColumnWidths();
	$: tableWrapperBorderStyle = $settings.tableWrapper ? getBorderCssValues($tableState.tableId) : 'none';

	async function handleSortTable(sortSettings: { propName: string; propType: PropType; sortDir: SortDirection }) {
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

{#if data}
	<div
		id="{$tableState.tableId}-wrapper"
		class:sst-wrapper={$settings.tableWrapper}
		class:sst-container={!$settings.tableWrapper}
		class:light-theme={$settings.themeName === 'light'}
		class:lighter-theme={$settings.themeName === 'lighter'}
		class:dark-theme={$settings.themeName === 'dark'}
		class:darker-theme={$settings.themeName === 'darker'}
		data-font-size={fontSize}
		style="width: {$componentWidth}; border: {tableWrapperBorderStyle}"
	>
		{#if columnSettings}
			<div class="simple-table">
				<DataTable
					tableId={$tableState.tableId}
					data={dataCurrentPage}
					tableLayout={$settings.tableLayout}
					fullWidth={$settings.fullWidth}
					showHeader={$settings.showHeader}
					header={$settings.header}
					showSortDescription={$settings.showSortDescription}
					{columnSettings}
					{pagination}
					on:sortTable={(e) => handleSortTable(e.detail)}
				/>
				{#if $settings.paginated}
					<Pagination
						tableId={$tableState.tableId}
						totalRows={$pagination.totalRows}
						totalPages={$pagination.totalPages}
						currentPage={$pagination.currentPage}
						startRow={$pagination.startRow}
						endRow={$pagination.endRow}
						pageSize={$pagination.pageSize}
						pageSizeOptions={$pagination.pageSizeOptions}
						pageRangeFormat={$settings.pageRangeFormat}
						pageNavFormat={$settings.pageNavFormat}
						rowType={$settings.rowType}
						paginationWidth={$componentWidth}
						on:goToFirstPage={() => pagination.goToFirstPage()}
						on:goToPrevPage={() => pagination.goToPrevPage()}
						on:goToNextPage={() => pagination.goToNextPage()}
						on:goToLastPage={() => pagination.goToLastPage()}
						on:changePageNumber={(e) => pagination.changePageNumber(e.detail)}
						on:changePageSize={(e) => pagination.changePageSize(e.detail)}
					/>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.sst-wrapper,
	.sst-container {
		--sst-default-font-size: 13px;
		--sst-default-table-wrapper-border-width: 2px;
		--sst-default-table-wrapper-border-style: 'dotted';
		--sst-default-table-wrapper-padding: 13px;
		--sst-default-sort-description-font-size: 0.85em;
		--sst-default-table-header-font-size: 1.25em;
		--sst-default-table-border-radius: 4px;
		--sst-default-col-header-padding: 2px 4px;
		--sst-default-col-header-text-weight: 500;
		--sst-default-col-header-highlight-text-weight: 500;
		--sst-default-body-cell-padding: 2px 4px;
		--sst-default-button-group-border-radius: 0.375em;

		font-size: var(--sst-font-size, var(--sst-default-font-size));
	}

	.sst-wrapper {
		background-color: var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));
		border-radius: 4px;
		padding: var(--sst-table-wrapper-padding, var(--sst-default-table-wrapper-padding));
		margin: 0 auto 1em auto;
	}

	.sst-container {
		margin-bottom: 1em;
	}

	.simple-table {
		display: flex;
		flex-flow: column nowrap;
		overflow-x: auto;
		white-space: nowrap;
	}

	:global(.btn-group) {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		flex-grow: 0;
	}

	.sst-wrapper.lighter-theme,
	.sst-container.lighter-theme {
		--sst-default-table-wrapper-bg-color: hsl(0, 0%, 100%);
		--sst-default-table-wrapper-border-color: hsl(212, 76%, 80%);

		--sst-default-text-color: hsl(213, 13%, 16%);
		--sst-default-link-text-color: hsl(216, 97%, 36%);
		--sst-default-link-hover-text-color: hsl(216, 97%, 36%);
		--sst-default-table-outer-border-color: hsl(212, 12%, 21%);
		--sst-default-table-header-text-color: hsl(213, 13%, 16%);
		--sst-default-sort-description-text-color: hsl(7, 84%, 61%);
		--sst-default-page-range-description-text-color: hsl(7, 84%, 61%);

		--sst-default-col-header-bg-color: hsl(207, 23%, 92%);
		--sst-default-col-header-text-color: hsl(213, 13%, 16%);
		--sst-default-col-header-vert-border-color: hsl(212, 12%, 21%);
		--sst-default-col-header-horiz-border-color: hsl(212, 12%, 21%);

		--sst-default-col-header-highlight-sort-bg-color: hsl(207, 23%, 92%);
		--sst-default-col-header-highlight-sort-text-color: hsl(213, 13%, 16%);
		--sst-default-col-header-highlight-sort-vert-border-color: hsl(212, 12%, 21%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(212, 12%, 21%);

		--sst-default-body-even-row-bg-color: hsl(0, 0%, 96%);
		--sst-default-body-odd-row-bg-color: hsl(0, 0%, 100%);
		--sst-default-body-inner-vert-border-color: hsl(212, 12%, 21%);
		--sst-default-body-inner-horiz-border-color: hsl(212, 12%, 21%);

		--sst-default-body-highlight-sort-bg-color: hsl(191, 90%, 92%);
		--sst-default-body-highlight-sort-text-color: hsl(7, 84%, 61%);
		--sst-default-body-highlight-sort-border-color: hsl(212, 12%, 21%);

		--sst-default-button-text-color: hsl(213, 13%, 16%);
		--sst-default-button-bg-color: hsl(207, 23%, 92%);
		--sst-default-button-border-color: hsl(213, 13%, 16%);

		--sst-default-button-hover-text-color: hsl(213, 13%, 16%);
		--sst-default-button-hover-bg-color: hsl(210, 17%, 84%);
		--sst-default-button-hover-border-color: hsla(218, 80%, 2%, 0.8);

		--sst-default-button-active-text-color: hsl(213, 13%, 16%);
		--sst-default-button-active-bg-color: hsl(210, 14%, 71%);
		--sst-default-button-active-border-color: hsl(213, 13%, 16%);

		--sst-default-button-disabled-text-color: hsl(211, 10%, 57%);
		--sst-default-button-disabled-bg-color: hsl(207, 23%, 92%);
		--sst-default-button-disabled-border-color: hsl(211, 10%, 57%);

		--sst-default-button-focus-border-color: hsla(218, 80%, 2%, 0.8);
	}

	.sst-wrapper.light-theme,
	.sst-container.light-theme {
		--sst-default-table-wrapper-bg-color: hsl(0, 0%, 95%);
		--sst-default-table-wrapper-border-color: hsl(218, 100%, 25%);

		--sst-default-text-color: hsl(0, 0%, 5%);
		--sst-default-link-text-color: hsl(218, 100%, 25%);
		--sst-default-link-hover-text-color: hsl(218, 100%, 25%);
		--sst-default-table-outer-border-color: hsl(218, 100%, 25%);
		--sst-default-table-header-text-color: hsl(0, 0%, 15%);
		--sst-default-sort-description-text-color: hsl(113, 100%, 30%);
		--sst-default-page-range-description-text-color: hsl(113, 100%, 30%);

		--sst-default-col-header-bg-color: hsl(218, 100%, 25%);
		--sst-default-col-header-text-color: hsl(0, 0%, 85%);
		--sst-default-col-header-vert-border-color: hsl(218, 100%, 25%);
		--sst-default-col-header-horiz-border-color: hsl(218, 100%, 25%);

		--sst-default-col-header-highlight-sort-bg-color: hsl(218, 100%, 25%);
		--sst-default-col-header-highlight-sort-text-color: hsl(0, 0%, 85%);
		--sst-default-col-header-highlight-sort-vert-border-color: hsl(218, 100%, 25%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(218, 100%, 25%);

		--sst-default-body-even-row-bg-color: hsl(0, 0%, 85%);
		--sst-default-body-odd-row-bg-color: hsl(0, 0%, 80%);
		--sst-default-body-inner-vert-border-color: hsl(0, 0%, 45%);
		--sst-default-body-inner-horiz-border-color: hsl(0, 0%, 50%);

		--sst-default-body-highlight-sort-bg-color: hsl(113, 100%, 70%);
		--sst-default-body-highlight-sort-text-color: hsl(0, 0%, 5%);
		--sst-default-body-highlight-sort-border-color: hsl(0, 0%, 50%);

		--sst-default-button-text-color: hsl(0, 0%, 100%);
		--sst-default-button-bg-color: hsl(113, 100%, 30%);
		--sst-default-button-border-color: hsl(113, 100%, 30%);

		--sst-default-button-hover-text-color: hsl(0, 0%, 100%);
		--sst-default-button-hover-bg-color: hsl(113, 100%, 20%);
		--sst-default-button-hover-border-color: transparent;

		--sst-default-button-active-text-color: hsl(0, 0%, 100%);
		--sst-default-button-active-bg-color: hsl(113, 100%, 40%);
		--sst-default-button-active-border-color: transparent;

		--sst-default-button-disabled-text-color: hsl(0, 0%, 80%);
		--sst-default-button-disabled-bg-color: hsl(0, 0%, 60%);
		--sst-default-button-disabled-border-color: transparent;

		--sst-default-button-focus-border-color: transparent;
	}

	.sst-wrapper.dark-theme,
	.sst-container.dark-theme {
		--sst-default-table-wrapper-bg-color: hsl(226, 27%, 10%);
		--sst-default-table-wrapper-border-color: hsl(251, 74%, 30%);

		--sst-default-text-color: hsl(0, 0%, 5%);
		--sst-default-link-text-color: hsl(251deg 74% 40%);
		--sst-default-link-hover-text-color: hsl(251deg 74% 50%);
		--sst-default-table-outer-border-color: hsl(251, 74%, 30%);
		--sst-default-table-header-text-color: hsl(0, 0%, 95%);
		--sst-default-sort-description-text-color: hsl(165, 100%, 45%);
		--sst-default-page-range-description-text-color: hsl(165, 100%, 45%);

		--sst-default-col-header-bg-color: hsl(251, 74%, 30%);
		--sst-default-col-header-text-color: hsl(0, 0%, 95%);
		--sst-default-col-header-vert-border-color: hsl(251, 74%, 30%);
		--sst-default-col-header-horiz-border-color: hsl(251, 74%, 30%);

		--sst-default-col-header-highlight-sort-bg-color: hsl(251, 74%, 30%);
		--sst-default-col-header-highlight-sort-text-color: hsl(0, 0%, 95%);
		--sst-default-col-header-highlight-sort-vert-border-color: hsl(251, 74%, 30%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(251, 74%, 30%);

		--sst-default-body-even-row-bg-color: hsl(0, 0%, 50%);
		--sst-default-body-odd-row-bg-color: hsl(0, 0%, 45%);
		--sst-default-body-inner-vert-border-color: hsl(0, 0%, 30%);
		--sst-default-body-inner-horiz-border-color: hsl(0, 0%, 35%);

		--sst-default-body-highlight-sort-bg-color: hsl(165, 100%, 55%);
		--sst-default-body-highlight-sort-text-color: hsl(0, 0%, 5%);
		--sst-default-body-highlight-sort-border-color: hsl(0, 0%, 35%);

		--sst-default-button-text-color: hsl(0, 0%, 10%);
		--sst-default-button-bg-color: hsl(165, 100%, 45%);
		--sst-default-button-border-color: hsl(165, 100%, 45%);

		--sst-default-button-hover-text-color: hsl(0, 0%, 0%);
		--sst-default-button-hover-bg-color: hsl(165, 100%, 35%);
		--sst-default-button-hover-border-color: transparent;

		--sst-default-button-active-text-color: hsl(0, 0%, 0%);
		--sst-default-button-active-bg-color: hsl(165, 100%, 75%);
		--sst-default-button-active-border-color: transparent;

		--sst-default-button-disabled-text-color: hsl(0, 0%, 30%);
		--sst-default-button-disabled-bg-color: hsl(0, 0%, 50%);
		--sst-default-button-disabled-border-color: transparent;

		--sst-default-button-focus-border-color: transparent;
	}

	.sst-wrapper.darker-theme,
	.sst-container.darker-theme {
		--sst-default-table-wrapper-bg-color: hsl(220, 13%, 3%);
		--sst-default-table-wrapper-border-color: hsl(215, 22%, 41%);

		--sst-default-text-color: hsl(210, 25%, 95%);
		--sst-default-link-text-color: hsl(210, 100%, 72%);
		--sst-default-link-hover-text-color: hsl(210, 100%, 72%);
		--sst-default-table-outer-border-color: hsl(215, 22%, 41%);
		--sst-default-table-header-text-color: hsl(210, 25%, 95%);
		--sst-default-sort-description-text-color: hsl(210, 100%, 72%);
		--sst-default-page-range-description-text-color: hsl(210, 100%, 72%);

		--sst-default-col-header-bg-color: hsl(220, 13%, 18%);
		--sst-default-col-header-text-color: hsl(210, 25%, 95%);
		--sst-default-col-header-vert-border-color: hsl(216, 8%, 32%);
		--sst-default-col-header-horiz-border-color: hsl(215, 22%, 41%);

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
		--sst-default-button-disabled-border-color: hsl(0, 0%, 50%);

		--sst-default-button-focus-border-color: hsl(212, 13%, 77%);
	}

	@media screen and (min-width: 640px) {
		.sst-wrapper,
		.sst-container {
			--sst-default-table-header-font-size: 1.35em;
			--sst-default-table-wrapper-padding: 14px;
			--sst-default-font-size: 14px;
		}
	}

	@media screen and (min-width: 768px) {
		.sst-wrapper,
		.sst-container {
			--sst-default-table-header-font-size: 1.5em;
			--sst-default-col-header-padding: 4px 6px;
			--sst-default-body-cell-padding: 4px 6px;
		}
	}

	/* @media screen and (min-width: 1024px) {
		.sst-wrapper,
		.sst-container {
			--sst-default-table-wrapper-padding: 16px;
		}
	} */
</style>
