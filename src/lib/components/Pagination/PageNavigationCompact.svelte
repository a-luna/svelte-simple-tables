<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { getAriaValues } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<nav role="navigation" aria-label="Table Pagination Controls" class="page-nav btn-group" data-testid="page-nav">
	<Button
		classList={['symbol']}
		disabled={currentPage === 1}
		label={'❬❬'}
		title={'First Page'}
		aria={getAriaValues(1, currentPage, totalPages, currentPage === 1)}
		testId="first"
		on:click={() => dispatch('goToFirstPage')}
	/>
	<Button
		classList={['symbol']}
		disabled={currentPage === 1}
		label={'❬'}
		title={'Previous Page'}
		aria={getAriaValues(currentPage - 1, currentPage, totalPages, currentPage === 1)}
		testId="prev"
		on:click={() => dispatch('goToPrevPage')}
	/>
	<Button
		classList={['symbol']}
		disabled={currentPage === totalPages}
		label={'❭'}
		title={'Next Page'}
		aria={getAriaValues(currentPage + 1, currentPage, totalPages, currentPage === totalPages)}
		testId="next"
		on:click={() => dispatch('goToNextPage')}
	/>
	<Button
		classList={['symbol']}
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
		margin: 0 0.25rem;
	}
</style>
