<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import type { TableStateStore } from '$lib/types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let tableId: string;
	export let totalRows: number;
	export let pageSize: number;
	export let pageSizeOptions: number[];
	const dispatch = createEventDispatcher();
	const options = { duration: 200, easing: cubicInOut };
	let pageSizeSettingElement: HTMLElement;
	const tableState: TableStateStore = getContext(tableId);

	$: pageSizeSettingWidthStore = syncWidth(pageSizeSettingElement);
	$: tableState.updatePaginationLeftWidth($pageSizeSettingWidthStore);

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

<div
	transition:fade={options}
	class="page-size-setting-wrapper"
	data-testid="page-size-choices"
	bind:this={pageSizeSettingElement}
>
	<div id="{tableId}-page-size" class="page-size-setting btn-group">
		{#each pageSizeOptions as pageSizeChoice, i}
			<Button
				classList={['page-size']}
				disabled={pageSizeIsInvalid(i)}
				active={pageSizeChoice === pageSize}
				label={pageSizeChoice.toString()}
				title="{pageSizeChoice} Rows/Page"
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
	}

	.page-size-setting {
		display: flex;
		flex-flow: row nowrap;
	}

	span {
		color: var(--sst-table-header-text-color, var(--sst-default-table-header-text-color));
		font-size: 0.95em;
		line-height: 1;
		margin-left: 0.5em;
	}
</style>
