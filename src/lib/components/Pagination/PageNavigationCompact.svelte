<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { getTableState } from '$lib/context';
	import { syncWidth } from '$lib/stores/syncWidth';
	import { getAriaValues } from '$lib/util';

	export let tableId: string;
	let pageNavElement: HTMLElement;
	const tableState = getTableState(tableId);

	$: paginationRightWidthStore = syncWidth(pageNavElement);
	$: $tableState.state.paginationRightWidth = $paginationRightWidthStore;
	$: classList = $tableState.pagination.totalPages === 1 ? ['symbol', 'no-page-nav'] : ['symbol'];
</script>

<nav
	id="{tableId}-page-nav"
	aria-label="Table Pagination Controls"
	class="page-nav btn-group"
	data-testid="page-nav"
	bind:this={pageNavElement}
>
	<Button
		{classList}
		disabled={$tableState.pagination.currentPage === 1}
		label={'❬❬'}
		title={'First Page'}
		aria={getAriaValues(
			1,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === 1,
		)}
		testId="first"
		on:click={() => tableState.goToFirstPage()}
	/>
	<Button
		{classList}
		disabled={$tableState.pagination.currentPage === 1}
		label={'❬'}
		title={'Previous Page'}
		aria={getAriaValues(
			$tableState.pagination.currentPage - 1,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === 1,
		)}
		testId="prev"
		on:click={() => tableState.goToPrevPage()}
	/>
	<Button
		{classList}
		disabled={$tableState.pagination.currentPage === $tableState.pagination.totalPages}
		label={'❭'}
		title={'Next Page'}
		aria={getAriaValues(
			$tableState.pagination.currentPage + 1,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === $tableState.pagination.totalPages,
		)}
		testId="next"
		on:click={() => tableState.goToNextPage()}
	/>
	<Button
		{classList}
		disabled={$tableState.pagination.currentPage === $tableState.pagination.totalPages}
		label={'❭❭'}
		title={'Last Page'}
		aria={getAriaValues(
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage,
			$tableState.pagination.totalPages,
			$tableState.pagination.currentPage === $tableState.pagination.totalPages,
		)}
		testId="last"
		on:click={() => tableState.goToLastPage()}
	/>
</nav>

<style lang="postcss">
	.page-nav {
		display: flex;
		flex-flow: row nowrap;
	}
</style>
