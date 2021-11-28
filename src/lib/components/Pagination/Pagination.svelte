<script lang="ts">
	import PageNavigation from '$lib/components/Pagination/PageNavigation.svelte';
	import PageNavigationCompact from '$lib/components/Pagination/PageNavigationCompact.svelte';
	import PageRangeDescription from '$lib/components/Pagination/PageRangeDescription.svelte';
	import PageSizeSetting from '$lib/components/Pagination/PageSizeSetting.svelte';
	import { breakPoints } from '$lib/stores/breakPoints';

	export let totalRows: number;
	export let totalPages: number;
	export let currentPage: number;
	export let startRow: number;
	export let endRow: number;
	export let pageSize: number;
	export let pageSizeOptions: number[];
	export let pageNavLayout: 'auto' | 'full' | 'compact' = 'auto';
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	let showPageSizeSetting: boolean = false;

  $: useCompactPageNav = pageNavLayout === 'compact' || (pageNavLayout === 'auto' && ($breakPoints.isMobileDisplay || totalPages > 4))
</script>

<section class="pagination-wrapper">
	<div class="pagination">
		<PageRangeDescription
			{totalRows}
			{startRow}
			{endRow}
			{pageNavLayout}
			{rowTypeSingle}
			{rowTypePlural}
			on:click={() => (showPageSizeSetting = !showPageSizeSetting)}
		/>
		{#if useCompactPageNav}
			<PageNavigationCompact
				{currentPage}
				{totalPages}
				on:goToFirstPage
				on:goToPrevPage
				on:goToNextPage
				on:goToLastPage
			/>
		{:else}
			<PageNavigation {currentPage} {totalPages} on:changePageNumber on:goToNextPage on:goToPrevPage />
		{/if}
	</div>
	{#if showPageSizeSetting}
		<PageSizeSetting
			{totalRows}
			{pageSize}
			{pageSizeOptions}
			on:changePageSize={() => (showPageSizeSetting = false)}
			on:changePageSize
		/>
	{/if}
</section>

<style lang="postcss">
	.pagination-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
	}

	.pagination {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		width: 100%;
	}
</style>
