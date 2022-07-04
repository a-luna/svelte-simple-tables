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
		themeName: 'dark',
		showHeader: true,
		header: caption,
		showSortDescription: true,
		sortBy,
		sortDir: 'desc',
		tableWrapper: true,
		expandToContainerWidth: false,
		paginated: true,
		pageSize: 5,
		clickableRows: false,
		animateSorting: true,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
	};

	const pfxPaginatedTableSettings: TableSettings = {
		tableId: 'pfx',
		showHeader: true,
		header: 'Barrels',
		showSortDescription: true,
		sortBy: 'time_pitch_thrown_est',
		sortDir: 'desc',
		tableWrapper: true,
		expandToContainerWidth: false,
		themeName: 'lighter',
		paginated: true,
		pageSize: 10,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'auto',
		pageNavFormat: 'auto',
		rowType: 'barrels',
	};

	const basicTableSettings: TableSettings = {
		tableId: 'vax-status-table-full',
		showHeader: true,
		header: 'Vax Status',
		showSortDescription: true,
		sortBy: 'age',
		sortDir: 'desc',
		themeName: 'light',
		tableWrapper: true,
		expandToContainerWidth: true,
		paginated: false,
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
	};

	const paginatedTableSettings: TableSettings = {
		tableId: 'vax-status-table',
		showHeader: false,
		showSortDescription: false,
		sortBy: 'age',
		sortDir: 'desc',
		tableWrapper: true,
		expandToContainerWidth: true,
		paginated: true,
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
	<div style="width: 650px; --sst-table-wrapper-border-width: 0;">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxPaginatedTableSettings}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
	<div>
		<SimpleTable data={vaxData} columnSettings={vaxDataColumnSettings} tableSettings={basicTableSettings} />
	</div>
</div>
<div class="dark-themes">
	<SimpleTable
		data={barrelsForDateData}
		columnSettings={pfxBarrelColumnSettings}
		tableSettings={pfxTableSettings}
		on:rowClicked={(e) => console.log({ pfx: e.detail })}
	/>
	<div style="width: 650px; --sst-table-wrapper-border-width: 0px;">
		<SimpleTable
			data={vaxData}
			columnSettings={vaxDataColumnSettings}
			tableSettings={paginatedTableSettings}
			on:rowClicked={(e) => console.log(e.detail)}
		/>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		margin: 0;
	}

	.dark-themes,
	.light-themes {
		padding: 1rem;
	}

	.dark-themes {
		background-color: hsl(220, 13%, 3%);
	}

	.light-themes {
		background-color: hsl(0, 100%, 100%);
	}
</style>
