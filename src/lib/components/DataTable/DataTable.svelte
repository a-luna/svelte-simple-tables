<script lang="ts">
	import ColumnHeader from '$lib/components/DataTable/ColumnHeader.svelte';
	import TableCell from '$lib/components/DataTable/TableCell.svelte';
	import TableHeader from '$lib/components/DataTable/TableHeader.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { ColumnSettings } from '$lib/types';
	import { createEventDispatcher,getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';

	type R = $$Generic;

	export let tableId: string;
	export let data: R[] = [];
	export let columnSettings: ColumnSettings<R>[] = [];
	let tableElement: HTMLElement;
	let { tableState, componentWidth } = getContext(tableId);
	const dispatch = createEventDispatcher();
	const options = { delay: 0, duration: 500, easing: cubicInOut };

	$: tableWidthStore = syncWidth(tableElement);
	$: $tableState.state.tableWidth = $tableWidthStore;

	function handleRowClicked(obj: R) {
		if ($tableState.clickableRows) {
			dispatch('rowClicked', obj);
		}
	}
</script>

<TableHeader tableId={$tableState.tableId} />
<article class="resp-table-container" style="width: {$componentWidth.finalComponentWidth}">
	<div class="resp-table-wrapper">
		<div
			id={$tableState.tableId}
			role="table"
			aria-labelledby="{$tableState.tableId}-cap"
			aria-rowcount={$tableState.pagination.totalRows}
			class="resp-table"
			class:auto-layout={$tableState.fullWidth}
			class:fixed-layout={!$tableState.fullWidth}
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
				{#if $tableState.animateSorting}
					{#each data as obj, i (obj)}
						<div
							animate:flip={options}
							role="row"
							class="resp-table-row"
							class:clickable={$tableState.clickableRows}
							aria-rowindex={$tableState.pagination.startRow + i + 1}
							data-testid="{$tableState.tableId}-row"
							on:click={() => handleRowClicked(obj)}
						>
							{#each columnSettings as { propName, propType, classList, colValue }}
								<TableCell tableId={$tableState.tableId} {obj} {propName} {propType} {classList} {colValue} />
							{/each}
						</div>
					{/each}
				{:else}
					{#each data as obj, i}
						<div
							role="row"
							class="resp-table-row"
							class:clickable={$tableState.clickableRows}
							aria-rowindex={$tableState.pagination.startRow + i + 1}
							data-testid="{$tableState.tableId}-row"
							on:click={() => handleRowClicked(obj)}
						>
							{#each columnSettings as { propName, propType, classList, colValue }}
								<TableCell tableId={$tableState.tableId} {obj} {propName} {propType} {classList} {colValue} />
							{/each}
						</div>
					{/each}
				{/if}
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

	.clickable {
		cursor: pointer;
	}
</style>
