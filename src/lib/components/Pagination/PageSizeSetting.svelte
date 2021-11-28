<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let totalRows: number;
	export let pageSize: number;
	export let pageSizeOptions: number[];
	const dispatch = createEventDispatcher();
	const options = { duration: 500, easing: cubicInOut };

	function changeSetting(newSetting: number) {
		if (pageSize !== newSetting) {
			dispatch('changePageSize', newSetting);
		}
	}

	function pageSizeIsInvalid(i: number): boolean {
		const prevPageSizeOption = i - 1 >= 0 ? pageSizeOptions[i - 1] : 0;
		return prevPageSizeOption > totalRows ? true : null;
	}
</script>

<div transition:slide={options} class="page-size-setting-wrapper" data-testid="page-size-choices">
	<div class="page-size-setting btn-group">
		{#each pageSizeOptions as pageSizeChoice, i}
			<Button
				classList={['page-size']}
				disabled={pageSizeIsInvalid(i)}
				active={pageSizeChoice === pageSize}
				label={pageSizeChoice.toString()}
				title={'{pageSizeChoice} Rows/Page'}
				aria={{}}
				testId="page-size-{pageSizeChoice}"
				on:click={() => changeSetting(pageSizeChoice)}
			/>
		{/each}
	</div>
	<span>rows/page</span>
</div>

<style lang="postcss">
	.page-size-setting-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		margin-top: 0.5rem;
	}

	.page-size-setting {
		display: flex;
		flex-flow: row nowrap;
	}

	span {
		font-size: 0.95rem;
		line-height: 1;
		margin-left: 0.5rem;
	}
</style>
