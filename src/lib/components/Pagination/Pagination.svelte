<script lang="ts">
	import PageNavigation from '$lib/components/Pagination/PageNavigation.svelte';
	import PageNavigationCompact from '$lib/components/Pagination/PageNavigationCompact.svelte';
	import PageRangeDescription from '$lib/components/Pagination/PageRangeDescription.svelte';
	import PageSizeSetting from '$lib/components/Pagination/PageSizeSetting.svelte';
	import { pageWidth } from '$lib/stores/pageWidth';
	import type { PageRangeFormat, PaginationLayout } from '$lib/types';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let tableId: string;
	export let totalRows: number;
	export let totalPages: number;
	export let currentPage: number;
	export let startRow: number;
	export let endRow: number;
	export let pageSize: number;
	export let pageSizeOptions: number[];
	export let pageRangeFormat: PageRangeFormat;
	export let pageNavFormat: PaginationLayout;
	export let rowType: string;
	export let paginationWidth: string;
	let showPageSizeSetting: boolean = false;
	const options = { duration: 200, easing: cubicInOut };

	$: useCompactPageNav =
		pageNavFormat === 'compact' || (pageNavFormat === 'auto' && ($pageWidth.isMobileDisplay || totalPages > 4));
	$: flexJustify = showPageSizeSetting ? 'center' : pageRangeFormat !== 'none' ? 'space-between' : '';
</script>

<section class="pagination-wrapper" style="width: {paginationWidth}">
	<div class="pagination" transition:fade={options} style="justify-content: {flexJustify}">
		{#if !showPageSizeSetting}
			{#if pageRangeFormat !== 'none'}
				<PageRangeDescription
					{tableId}
					{totalRows}
					{startRow}
					{endRow}
					{pageRangeFormat}
					{rowType}
					on:click={() => (showPageSizeSetting = !showPageSizeSetting)}
				/>
			{:else}
				<PageSizeSetting
					{tableId}
					{totalRows}
					{pageSize}
					{pageSizeOptions}
					on:changePageSize={() => (showPageSizeSetting = false)}
					on:changePageSize
				/>
			{/if}
			{#if useCompactPageNav}
				<PageNavigationCompact
					{tableId}
					{currentPage}
					{totalPages}
					on:goToFirstPage
					on:goToPrevPage
					on:goToNextPage
					on:goToLastPage
				/>
			{:else}
				<PageNavigation {tableId} {currentPage} {totalPages} on:changePageNumber on:goToNextPage on:goToPrevPage />
			{/if}
		{/if}
		{#if showPageSizeSetting}
			<PageSizeSetting
				{tableId}
				{totalRows}
				{pageSize}
				{pageSizeOptions}
				on:changePageSize={() => (showPageSizeSetting = false)}
				on:changePageSize
			/>
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
