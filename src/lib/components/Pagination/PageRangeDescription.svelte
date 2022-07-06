<script lang="ts">
	import SettingsIcon from '$lib/components/Icons/SettingsIcon.svelte';
	import { getTableState } from '$lib/context';
	import { pageWidth } from '$lib/stores/pageWidth';
	import { syncWidth } from '$lib/stores/syncWidth';

	type R = $$Generic;

	export let tableId: string;
	let pageDescriptionElement: HTMLElement;
	const tableState = getTableState<R>(tableId);

	$: fontSize = $pageWidth.current < 1024 ? '1em' : '1.05em';
	$: pageDescWidthStore = syncWidth(pageDescriptionElement);
	$: $tableState.state.paginationLeftWidth = $pageDescWidthStore;
	$: compact =
		$tableState.pageRangeFormat === 'compact' ||
		($tableState.pageRangeFormat === 'auto' && $tableState.state.containerWidth < 768);
</script>

<div
	id="{tableId}-page-size"
	class="pagination-description"
	data-testid="change-page-size"
	bind:this={pageDescriptionElement}
	on:click
>
	<div class="change-settings-icon" title="Click to change # of rows displayed per page">
		<SettingsIcon />
	</div>
	<aside title="Click to change # of rows displayed per page" style="font-size: {fontSize}">
		<div class="current-page-range" data-testid="page-range">
			{#if compact}
				<b>{$tableState.pagination.startRow + 1}-{$tableState.pagination.endRow}/{$tableState.pagination.totalRows}</b>
			{:else}
				Showing <b>{$tableState.pagination.startRow + 1}</b> to <b>{$tableState.pagination.endRow}</b> of
				<b>{$tableState.pagination.totalRows}</b>
				{$tableState.rowType}
			{/if}
		</div>
	</aside>
</div>

<style lang="postcss">
	.pagination-description {
		color: var(--sst-page-range-description-text-color, var(--sst-default-page-range-description-text-color));
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		gap: 0.25em;
		line-height: 1;
		cursor: pointer;
	}

	.change-settings-icon {
		display: block;
		margin-bottom: 0.125em;
		stroke: currentColor;
		stroke-width: 2;
		width: 1.25em;
		height: 1em;
	}

	.current-page-range {
		display: inline-block;
	}
</style>
