<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import { getAriaValues } from '$lib/util';
	import { getContext } from 'svelte';

	export let tableId: string;
	let { tableState } = getContext(tableId);
	let pageNavElement: HTMLElement;

	$: pageNumbers = Array.from({ length: $tableState.pagination.totalPages }, (_, i) => i + 1);
	$: paginationRightWidthStore = syncWidth(pageNavElement);
	$: $tableState.state.paginationRightWidth = $paginationRightWidthStore;

	function handleClick(page: number) {
		if ($tableState.pagination.currentPage !== page) {
			tableState.changePageNumber(page);
		}
	}
</script>

<nav
	id="{tableId}-page-nav"
	aria-label="Table Pagination Controls"
	class="page-nav btn-group"
	data-testid="page-nav"
	bind:this={pageNavElement}
>
	<Button
		classList={['text']}
		disabled={$tableState.pagination.currentPage === 1}
		label="Previous"
		title="Previous Page"
		aria={getAriaValues(
			1,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === 1,
		)}
		testId="prev"
		on:click={() => tableState.goToPrevPage()}
	/>
	{#each pageNumbers as page}
		<Button
			classList={['number']}
			label={page.toString()}
			title="Page {page}"
			active={$tableState.pagination.currentPage === page}
			aria={getAriaValues(
				page,
				$tableState.pagination.currentPage,
				$tableState.pagination.totalPages,
				$tableState.pagination.currentPage === page,
			)}
			testId="page{page}"
			on:click={() => handleClick(page)}
		/>
	{/each}
	<Button
		classList={['text']}
		disabled={$tableState.pagination.currentPage === $tableState.pagination.totalPages}
		label="Next"
		title="Next Page"
		aria={getAriaValues(
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === $tableState.pagination.totalPages,
		)}
		testId="next"
		on:click={() => tableState.goToNextPage()}
	/>
</nav>

<style lang="postcss">
	.page-nav {
		display: flex;
		flex-flow: row nowrap;
	}
</style>
