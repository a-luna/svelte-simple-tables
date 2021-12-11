<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { TableStateStore } from '$lib/types';
	import { getAriaValues } from '$lib/util';
	import { createEventDispatcher, getContext } from 'svelte';

	export let tableId: string;
	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();
	let pageNavElement: HTMLElement;
	const tableState: TableStateStore = getContext(tableId);

	$: paginationRightWidthStore = syncWidth(pageNavElement);
	$: tableState.updatePaginationRightWidth($paginationRightWidthStore);
	$: classList = totalPages === 1 ? ['symbol', 'no-page-nav'] : ['symbol'];
</script>

<nav
	id="{tableId}-page-nav"
	role="navigation"
	aria-label="Table Pagination Controls"
	class="page-nav btn-group"
	data-testid="page-nav"
	bind:this={pageNavElement}
>
	<Button
		{classList}
		disabled={currentPage === 1}
		label={'❬❬'}
		title={'First Page'}
		aria={getAriaValues(1, currentPage, totalPages, currentPage === 1)}
		testId="first"
		on:click={() => dispatch('goToFirstPage')}
	/>
	<Button
		{classList}
		disabled={currentPage === 1}
		label={'❬'}
		title={'Previous Page'}
		aria={getAriaValues(currentPage - 1, currentPage, totalPages, currentPage === 1)}
		testId="prev"
		on:click={() => dispatch('goToPrevPage')}
	/>
	<Button
		{classList}
		disabled={currentPage === totalPages}
		label={'❭'}
		title={'Next Page'}
		aria={getAriaValues(currentPage + 1, currentPage, totalPages, currentPage === totalPages)}
		testId="next"
		on:click={() => dispatch('goToNextPage')}
	/>
	<Button
		{classList}
		disabled={currentPage === totalPages}
		label={'❭❭'}
		title={'Last Page'}
		aria={getAriaValues(totalPages, currentPage, totalPages, currentPage === totalPages)}
		testId="last"
		on:click={() => dispatch('goToLastPage')}
	/>
</nav>

<style lang="postcss">
	.page-nav {
		display: flex;
		flex-flow: row nowrap;
	}
</style>
