<script lang="ts">
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import type { TableSettings } from '$lib/types';
	import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
	import { barrelsForDateData } from '$lib/__tests__/data/getBarrelsForDate';
	import type { PitchFx } from '$lib/__tests__/types';
	import { vaxDataColumnSettings } from './columnSettings';
	import type { VaxData } from './data';
	import { vaxData } from './data';

	const tableId = 'all-barrels';
	const caption = 'Barrels';
	const sortBy = 'launch_speed';
	const pfxTableSettings: TableSettings<PitchFx> = {
		tableId,
		themeName: 'dark',
		showHeader: false,
		header: caption,
		showSortDescription: false,
		sortBy,
		sortDir: 'desc',
		tableWrapper: false,
		expandToContainerWidth: false,
		paginated: true,
		pageSize: 5,
		clickableRows: false,
		animateSorting: true,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'none',
		pageNavFormat: 'full',
	};

	const pfxPaginatedTableSettings: TableSettings<PitchFx> = {
		tableId: 'pfx',
		showHeader: true,
		header: 'Barrels',
		showSortDescription: true,
		sortBy: 'time_pitch_thrown_est',
		sortDir: 'desc',
		tableWrapper: true,
		expandToContainerWidth: true,
		themeName: 'light',
		paginated: true,
		pageSize: 10,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'auto',
		pageNavFormat: 'auto',
		rowType: 'barrels',
	};

	const basicTableSettings: TableSettings<VaxData> = {
		tableId: 'vax-status-table-full',
		showHeader: true,
		header: 'Vax Status',
		showSortDescription: true,
		sortBy: 'age',
		sortDir: 'desc',
		themeName: 'lighter',
		tableWrapper: false,
		expandToContainerWidth: false,
		paginated: false,
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
	};

	const paginatedTableSettings: TableSettings<VaxData> = {
		tableId: 'vax-status-table',
		showHeader: true,
		header: 'Vax Status',
		showSortDescription: true,
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
	<div style="--sst-table-wrapper-border-width: 0;">
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
	<div style="--sst-table-wrapper-border-width: 0; --sst-table-header-text-color: hsl(0, 0%, 0%)">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxTableSettings}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
</div>
<div class="dark-themes">
	<div style="--sst-table-wrapper-border-width: 0;">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxTableSettings}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
	<div>
		<SimpleTable
			data={vaxData}
			columnSettings={vaxDataColumnSettings}
			tableSettings={paginatedTableSettings}
			on:rowClicked={(e) => console.log(e.detail)}
		/>
	</div>
	<div style="width: 500px">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxPaginatedTableSettings}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
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
