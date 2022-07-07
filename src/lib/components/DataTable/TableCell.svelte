<script lang="ts">
	import { getTableState } from '$lib/context';
	import { getSortType } from '$lib/util';

	type R = $$Generic;

	export let tableId: string;
	export let obj: R;
	export let propName: keyof R;
	export let classList: string[] = [];
	export let colValue: (obj: R) => string = null;
	const tableState = getTableState<R>(tableId);
	let cellValue = '';

	$: cellValue = colValue ? colValue(obj) : obj[propName].toString();
	$: propType = getSortType<R>(obj, propName);
</script>

<div
	role="cell"
	class="sst-table-body-cell{classList ? ` ${classList.join(' ')}` : ''}"
	class:highlight-stat={$tableState.sortBy === propName}
	class:text-right={propType === 'number'}
	data-stat-name={propName}
>
	<span>{@html cellValue}</span>
</div>

<style lang="postcss">
	.sst-table-body-cell {
		display: table-cell;
		text-align: right;
		border-top: none;
		border-left: 1px solid var(--sst-body-inner-vert-border-color, var(--sst-default-body-inner-vert-border-color));
		border-bottom: 1px dotted var(--sst-body-inner-horiz-border-color, var(--sst-default-body-inner-horiz-border-color));
		padding: var(--sst-body-cell-padding, var(--sst-default-body-cell-padding));
	}

	.sst-table-body-cell:first-child {
		border-left: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.sst-table-body-cell:last-child {
		border-right: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	:global(.sst-resp-table-row:last-child) .sst-table-body-cell {
		border-bottom: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	:global(.sst-resp-table-row:last-child) .sst-table-body-cell:first-child {
		border-bottom-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	:global(.sst-resp-table-row:last-child) .sst-table-body-cell:last-child {
		border-bottom-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.highlight-stat {
		color: var(--sst-body-highlight-sort-text-color, var(--sst-default-body-highlight-sort-text-color));
		background-color: var(--sst-body-highlight-sort-bg-color, var(--sst-default-body-highlight-sort-bg-color));
		border-bottom: 1px dotted
			var(--sst-body-highlight-sort-border-color, var(--sst-default-body-highlight-sort-border-color));
	}

	:global(.sst-resp-table-row:last-child) .highlight-stat {
		border-bottom: 1px solid var(--sst-table-outer-border-color, var(--sst-default-table-outer-border-color));
	}

	.text-center {
		text-align: center;
	}
</style>
