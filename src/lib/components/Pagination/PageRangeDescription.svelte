<script lang="ts">
	import SettingsIcon from '$lib/components/Icons/SettingsIcon.svelte';
	import { breakPoints } from '$lib/stores/breakPoints';

	export let totalRows: number;
	export let startRow: number;
	export let endRow: number;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	export let pageNavLayout: 'auto' | 'full' | 'compact' = 'auto';

	$: rowType = totalRows === 1 ? rowTypeSingle : rowTypePlural;
	$: fontSize = $breakPoints.pageWidth < 1024 ? '1rem' : '1.05rem';
</script>

<div class="pagination-description" data-testid="change-page-size" on:click>
	<div class="change-settings-icon" title="Click to change # of rows displayed per page">
		<SettingsIcon />
	</div>
	<aside title="Click to change # of rows displayed per page" style="font-size: {fontSize}">
		<div class="current-page-range" data-testid="page-range">
			{#if pageNavLayout === 'compact' || (pageNavLayout === 'auto' && $breakPoints.isMobileDisplay)}
				<b>{startRow + 1}-{endRow}/{totalRows}</b>
			{:else if pageNavLayout === 'full' || (pageNavLayout === 'auto' && !$breakPoints.isMobileDisplay)}
				Showing <b>{startRow + 1}</b> to <b>{endRow}</b> of <b>{totalRows}</b> {rowType}
			{/if}
		</div>
	</aside>
</div>

<style lang="postcss">
	.pagination-description {
		color: var(--sst-page-description-text-color, var(--sst-default-page-description-text-color));
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		gap: 0.25rem;
		line-height: 1;
		cursor: pointer;
	}

	.change-settings-icon {
		display: block;
		margin-bottom: 0.125rem;
		stroke: currentColor;
		stroke-width: 2;
		width: 1.25rem;
		height: 1rem;
	}

	.current-page-range {
		display: inline-block;
	}
</style>
