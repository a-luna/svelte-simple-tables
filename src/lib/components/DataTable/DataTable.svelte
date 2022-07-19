<script lang="ts">
	import ColumnHeader from '$lib/components/DataTable/ColumnHeader.svelte';
	import TableCell from '$lib/components/DataTable/TableCell.svelte';
	import TableHeader from '$lib/components/DataTable/TableHeader.svelte';
	import { getTableState } from '$lib/context';
	import { syncWidth } from '$lib/stores';
	import type { ColumnSettings } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';

	type R = $$Generic;

	export let tableId: string;
	export let data: R[] = [];
	export let columnSettings: ColumnSettings<R>[] = [];
	let tableElement: HTMLElement;
	const tableState = getTableState<R>(tableId);
	const dispatch = createEventDispatcher<{ rowClicked: R }>();
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
<article class="sst-resp-table-container">
	<div class="sst-resp-table-wrapper" data-testid={$tableState.tableId}>
		<div
			id={$tableState.tableId}
			role="table"
			aria-labelledby="{$tableState.tableId}-cap"
			aria-rowcount={$tableState.pagination.totalRows}
			class="sst-resp-table"
			bind:this={tableElement}
		>
			<div role="row" class="sst-resp-table-header">
				{#each columnSettings as { propName, headerText, tooltip, sortable }}
					<ColumnHeader
						tableId={$tableState.tableId}
						{data}
						{propName}
						{headerText}
						{tooltip}
						{sortable}
						on:sortTable
					/>
				{/each}
			</div>
			<div role="rowgroup" class="sst-resp-table-body">
				{#if $tableState.animateSorting}
					{#each data as obj, i (obj)}
						<div
							animate:flip={options}
							role="row"
							class="sst-resp-table-row"
							class:clickable={$tableState.clickableRows}
							aria-rowindex={$tableState.pagination.startRow + i + 1}
							data-testid="{$tableState.tableId}-row"
							on:click={() => handleRowClicked(obj)}
						>
							{#each columnSettings as { propName, classList, colValue }}
								<TableCell tableId={$tableState.tableId} {obj} {propName} {classList} {colValue} />
							{/each}
						</div>
					{/each}
				{:else}
					{#each data as obj, i}
						<div
							role="row"
							class="sst-resp-table-row"
							class:clickable={$tableState.clickableRows}
							aria-rowindex={$tableState.pagination.startRow + i + 1}
							data-testid="{$tableState.tableId}-row"
							on:click={() => handleRowClicked(obj)}
						>
							{#each columnSettings as { propName, classList, colValue }}
								<TableCell tableId={$tableState.tableId} {obj} {propName} {classList} {colValue} />
							{/each}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.sst-resp-table-container {
		overflow-x: auto;
		white-space: nowrap;
		border-top-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-top-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.sst-resp-table-wrapper {
		display: inline-block;
	}

	.sst-resp-table {
		display: table;
		color: var(--sst-text-color, var(--sst-default-text-color));
		line-height: 1.25em;
		margin: 0 auto;
		table-layout: fixed;
	}

	.sst-resp-table-header {
		display: table-header-group;
		text-align: center;
	}

	.sst-resp-table-body {
		display: table-row-group;
	}

	.sst-resp-table-body :global(a) {
		text-decoration: none;
		color: var(--sst-link-text-color, var(--sst-default-link-text-color));
	}

	.sst-resp-table-body :global(a:hover) {
		text-decoration: underline;
		color: var(--sst-link-hover-text-color, var(--sst-default-link-hover-text-color));
	}

	.sst-resp-table-row {
		display: table-row;
	}

	.sst-resp-table-row:nth-child(even) {
		background-color: var(--sst-body-even-row-bg-color, var(--sst-default-body-even-row-bg-color));
	}

	.sst-resp-table-row:nth-child(odd) {
		background-color: var(--sst-body-odd-row-bg-color, var(--sst-default-body-odd-row-bg-color));
	}

	.sst-resp-table-row:last-child {
		border-bottom-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-bottom-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.clickable {
		cursor: pointer;
	}
</style>
