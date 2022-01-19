<script lang="ts">
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import type { TableSettings } from '$lib/types';
	import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
	import { barrelsForDateData } from '$lib/__tests__/data/getBarrelsForDate';
	import { vaxDataColumnSettings } from './columnSettings';
	import { vaxData } from './data';

	const tableId = 'all-barrels';
	const caption = 'Barrels';
	const sortBy = 'launch_speed';
	const pfxTableSettings: TableSettings = {
		tableId,
		showHeader: true,
		header: caption,
		showSortDescription: true,
		sortBy,
		sortDir: 'desc',
		tableWrapper: true,
		paginated: true,
		pageSize: 5,
		clickableRows: false,
		animateSorting: true,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
	};
	// const pfxTableSettings: TableSettings = {
	// 	tableId: 'pfx',
	// 	showHeader: true,
	// 	header: 'Barrels',
	// 	showSortDescription: true,
	// 	fullWidth: false,
	// 	sortBy: 'time_pitch_thrown_est',
	// 	sortDir: 'desc',
	// 	tableWrapper: true,
	// 	themeName: 'light',
	// 	paginated: false,
	// 	pageSize: 10,
	// 	pageSizeOptions: [5, 10, 15, 20, 25],
	// 	pageRangeFormat: 'auto',
	// 	pageNavFormat: 'auto',
	// 	rowType: 'barrels',
	// };

	const basicTableSettings: TableSettings = {
		tableId: 'vax-status-table-full',
		showHeader: true,
		header: 'Vax Status',
		sortBy: 'age',
		sortDir: 'desc',
		themeName: 'dark',
		tableWrapper: true,
	};

	const paginatedTableSettings: TableSettings = {
		tableId: 'vax-status-table',
		showHeader: true,
		header: 'Vax Status',
		showSortDescription: true,
		sortBy: 'age',
		sortDir: 'desc',
		tableWrapper: true,
		paginated: false,
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
		pageSize: 10,
		pageSizeOptions: [5, 10, 15, 20, 25],
		themeName: 'darker',
		clickableRows: true,
		rowType: 'vax records',
	};
</script>

<div class="light-themes">
	<SimpleTable
		data={barrelsForDateData}
		columnSettings={pfxBarrelColumnSettings}
		tableSettings={pfxTableSettings}
		on:rowClicked={(e) => console.log({ pfx: e.detail })}
	/>
</div>
<div class="dark-themes" style="display: none">
	<!-- <SimpleTable data={vaxData} columnSettings={vaxDataColumnSettings} tableSettings={basicTableSettings} /> -->
	<SimpleTable data={vaxData} columnSettings={vaxDataColumnSettings} tableSettings={paginatedTableSettings} />
</div>

<style lang="postcss">
	:global(body) {
		margin: 0;
	}

	.dark-themes {
		background-color: hsl(220, 13%, 3%);
	}

	.light-themes {
		background-color: hsl(0, 100%, 100%);
	}
</style>
