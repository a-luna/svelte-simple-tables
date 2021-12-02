<script lang="ts">
	import Button from '$lib/components/Pagination/Button.svelte';
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import type { TableSettings } from '$lib/types';
	import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
	import { barrelsForDateMockData } from '$lib/__tests__/data/getBarrelsForDate';
	import { writable } from 'svelte/store';

	const settings = writable<TableSettings>({
		showHeader: true,
		header: 'Barrels',
		showSortDescription: true,
		sortBy: 'time_pitch_thrown_est',
		sortDir: 'desc',
		tableWrapper: false,
		themeName: 'darker',
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageNavLayout: 'compact',
		rowTypeSingle: 'barrel',
		rowTypePlural: 'barrels',
	});
</script>

<div class="table-wrapper">
	<div id="theme-name" class="btn-group">
		<Button label="Dark" active={$settings.themeName === 'dark'} on:click={() => ($settings.themeName = 'dark')} />
		<Button
			label="Darker"
			active={$settings.themeName === 'darker'}
			on:click={() => ($settings.themeName = 'darker')}
		/>
		<Button label="Light" active={$settings.themeName === 'light'} on:click={() => ($settings.themeName = 'light')} />
		<Button
			label="Lighter"
			active={$settings.themeName === 'lighter'}
			on:click={() => ($settings.themeName = 'lighter')}
		/>
	</div>
	<SimpleTable data={barrelsForDateMockData} columns={pfxBarrelColumnSettings} {settings} />
</div>

<style lang="postcss">
	.table-wrapper {
		background-color: var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));
		border: 2px dotted var(--sst-table-wrapper-border-color, var(--sst-default-table-wrapper-border-color));
		border-radius: 4px;
		max-width: 90%;
		padding: var(--sst-table-wrapper-padding, var(--sst-default-table-wrapper-padding));
		margin: 0 auto 1rem auto;
	}

	#theme-name {
		margin-bottom: 1rem;
	}
</style>
