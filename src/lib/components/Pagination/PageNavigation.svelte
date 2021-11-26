<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { getAriaValues } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	function handleClick(page: number) {
		if (currentPage !== page) {
			dispatch('changePageNumber', page);
		}
	}
</script>

<nav role="navigation" aria-label="Table Pagination Controls" class="page-nav btn-group" data-testid="page-nav">
	<Button
		classList={['text']}
		disabled={currentPage === 1}
		label="Previous"
		title="Previous Page"
		aria={getAriaValues(1, currentPage, totalPages, currentPage === 1)}
		testId="prev"
		on:click={() => dispatch('goToPrevPage')}
	/>
	{#each pageNumbers as page}
		<Button
			classList={['number']}
			label={page.toString()}
			title="Page {page}"
			active={currentPage === page}
			aria={getAriaValues(page, currentPage, totalPages, currentPage === page)}
			testId="page{page}"
			on:click={() => handleClick(page)}
		/>
	{/each}
	<Button
		classList={['text']}
		disabled={currentPage === totalPages}
		label="Next"
		title="Next Page"
		aria={getAriaValues(totalPages, currentPage, totalPages, currentPage === totalPages)}
		testId="next"
		on:click={() => dispatch('goToNextPage')}
	/>
</nav>

<style lang="postcss">
	.page-nav {
		display: flex;
		flex-flow: row nowrap;
		margin: 0 0.25rem;
	}
</style>
