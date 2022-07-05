<script lang="ts">
	import PageNavigation from '$lib/components/Pagination/PageNavigation.svelte';
	import PageNavigationCompact from '$lib/components/Pagination/PageNavigationCompact.svelte';
	import PageRangeDescription from '$lib/components/Pagination/PageRangeDescription.svelte';
	import PageSizeSetting from '$lib/components/Pagination/PageSizeSetting.svelte';
	import { getTableSize, getTableState } from '$lib/context';
	import { pageWidth } from '$lib/stores/pageWidth';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	type R = $$Generic;

	export let tableId: string;
	const tableState = getTableState<R>(tableId);
	const componentWidth = getTableSize(tableId);
	let showPageSizeSetting = false;
	const options = { duration: 200, easing: cubicInOut };

	$: useCompactPageNav =
		$tableState.pageNavFormat === 'compact' ||
		($tableState.pageNavFormat === 'auto' && ($pageWidth.isMobileDisplay || $tableState.pagination.totalPages > 4));
	$: flexJustify = showPageSizeSetting ? 'center' : 'space-between';

	function handleChangePageSize(pageSize: number) {
		tableState.changePageSize(pageSize);
		showPageSizeSetting = false;
	}
</script>

<section class="pagination-wrapper" style="width: {$componentWidth.finalComponentWidth}">
	<div class="pagination" transition:fade={options} style="justify-content: {flexJustify}">
		{#if !showPageSizeSetting}
			{#if $tableState.pageRangeFormat !== 'none'}
				<PageRangeDescription {tableId} on:click={() => (showPageSizeSetting = !showPageSizeSetting)} />
			{:else}
				<PageSizeSetting {tableId} on:changePageSize={(e) => handleChangePageSize(e.detail)} />
			{/if}
			{#if useCompactPageNav}
				<PageNavigationCompact {tableId} />
			{:else}
				<PageNavigation {tableId} />
			{/if}
		{/if}
		{#if showPageSizeSetting}
			<PageSizeSetting {tableId} on:changePageSize={(e) => handleChangePageSize(e.detail)} />
		{/if}
	</div>
</section>

<style lang="postcss">
	.pagination-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		margin-top: 0.5em;
	}

	.pagination {
		display: flex;
		flex-flow: row nowrap;
		margin-top: 0.25em;
	}
</style>
