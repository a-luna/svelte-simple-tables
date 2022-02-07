<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import { syncWidth } from '$lib/stores/syncWidth';
	import { createEventDispatcher, getContext } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let tableId: string;
	const dispatch = createEventDispatcher();
	const options = { duration: 200, easing: cubicInOut };
	let pageSizeSettingElement: HTMLElement;
	const { tableState } = getContext(tableId);

	$: pageSizeSettingWidthStore = syncWidth(pageSizeSettingElement);
	$: $tableState.state.paginationLeftWidth = $pageSizeSettingWidthStore;
	$: if (typeof window !== 'undefined') fixFirstInvalidPageSizeButton($tableState.pageSizeOptions);

	function changeSetting(newSetting: { pageSize: number; index: number }) {
		const { pageSize, index } = newSetting;
		if (!pageSizeIsInvalid(index)) {
			dispatch('changePageSize', pageSize);
		}
	}

	const allPageSizesAreValid = (): boolean =>
		$tableState.pageSizeOptions.every((opt: number) => opt <= $tableState.pagination.totalRows);

	function pageSizeIsInvalid(i: number): boolean {
		const prevPageSizeOption = i - 1 >= 0 ? $tableState.pageSizeOptions[i - 1] : 0;
		return prevPageSizeOption > $tableState.pagination.totalRows ? true : null;
	}

	const getFirstInvalidPageSizeOption = (pageSizeOptions: number[]): number =>
		pageSizeOptions
			.map((opt, i) => ({ size: opt, sizeIsValid: !pageSizeIsInvalid(i) }))
			.sort((a, b) => a.size - b.size)
			.find(({ sizeIsValid }) => !sizeIsValid).size;

	function fixFirstInvalidPageSizeButton(pageSizeOptions: number[]) {
		if (!allPageSizesAreValid()) {
			const pageSize = getFirstInvalidPageSizeOption(pageSizeOptions);
			if (pageSize) {
				const buttonSelector = `#${tableId}-page-size [data-testid="page-size-${pageSize}"]`;
				const pageSizeButton = document.querySelector<HTMLElement>(buttonSelector);
				if (pageSizeButton) {
					pageSizeButton.style.borderLeft =
						'1px solid var(--sst-button-border-color, var(--sst-default-button-border-color))';
				}
			}
		}
	}
</script>

<div
	transition:fade={options}
	class="page-size-setting-wrapper"
	data-testid="page-size-choices"
	bind:this={pageSizeSettingElement}
>
	<div id="{tableId}-page-size" class="page-size-setting btn-group">
		{#each $tableState.pageSizeOptions as pageSizeChoice, i}
			<Button
				classList={['page-size']}
				disabled={pageSizeIsInvalid(i)}
				active={pageSizeChoice === $tableState.pageSize}
				label={pageSizeChoice.toString()}
				title="{pageSizeChoice} Rows/Page"
				aria={{}}
				testId="page-size-{pageSizeChoice}"
				on:click={() => changeSetting({ pageSize: pageSizeChoice, index: i })}
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
