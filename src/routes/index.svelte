<script lang="ts">
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import { getDefaultTableSettings } from '$lib/stores/tableState';
	import type { TableSettings } from '$lib/types';
	import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
	import { barrelsForDateData } from '$lib/__tests__/data/getBarrelsForDate';
	import type { PitchFx } from '$lib/__tests__/types';
	import { vaxDataColumnSettings } from './columnSettings';
	import type { VaxData } from './data';
	import { vaxData } from './data';

	const pfxCaption = 'Barrels';
	const pfxSortBy = 'launch_speed';
	const pfxRowType = 'barrels';
	const pfxTotalRows = barrelsForDateData.length;
	const vaxCaption = 'Vax Status';
	const vaxSortBy = 'age';
	const vaxTotalRows = vaxData.length;

	const pfxTableSettings1: TableSettings<PitchFx> = {
		...getDefaultTableSettings<PitchFx>(pfxTotalRows),
		themeName: 'light',
		sortBy: pfxSortBy,
		sortDir: 'desc',
		paginated: true,
		pageSize: 5,
		animateSorting: true,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'none',
		pageNavFormat: 'full',
	};

	const pfxTableSettings2: TableSettings<PitchFx> = {
		...getDefaultTableSettings<PitchFx>(pfxTotalRows),
		sortBy: pfxSortBy,
		sortDir: 'desc',
		themeName: 'darker',
		clickableRows: true,
		animateSorting: true,
		rowType: pfxRowType,
	};

	const pfxTableSettings3: TableSettings<PitchFx> = {
		...getDefaultTableSettings<PitchFx>(pfxTotalRows),
		themeName: 'dark',
		showHeader: true,
		header: pfxCaption,
		showSortDescription: true,
		sortBy: pfxSortBy,
		tableWrapper: true,
		expandToContainerWidth: true,
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		rowType: pfxRowType,
	};

	const vaxTableSettings1: TableSettings<VaxData> = {
		...getDefaultTableSettings<VaxData>(vaxTotalRows),
		showHeader: true,
		header: vaxCaption,
		showSortDescription: true,
		sortBy: vaxSortBy,
		sortDir: 'desc',
		themeName: 'lighter',
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
		rowType: 'vax records',
	};

	const vaxTableSettings2: TableSettings<VaxData> = {
		...getDefaultTableSettings<VaxData>(vaxTotalRows),
		showHeader: true,
		header: vaxCaption,
		showSortDescription: true,
		sortBy: vaxSortBy,
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
			tableSettings={pfxTableSettings1}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
	<div>
		<SimpleTable
			data={vaxData}
			columnSettings={vaxDataColumnSettings}
			tableSettings={vaxTableSettings1}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
	<div style="--sst-table-wrapper-border-width: 0; --sst-table-header-text-color: hsl(0, 0%, 0%)">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxTableSettings2}
			on:rowClicked={(e) => console.log({ pfx: e.detail })}
		/>
	</div>
</div>

<div class="dark-themes">
	<div>
		<SimpleTable
			data={vaxData}
			columnSettings={vaxDataColumnSettings}
			tableSettings={vaxTableSettings2}
			on:rowClicked={(e) => console.log({ vaxData: e.detail })}
		/>
	</div>
	<div style="max-width: 850px">
		<SimpleTable
			data={barrelsForDateData}
			columnSettings={pfxBarrelColumnSettings}
			tableSettings={pfxTableSettings3}
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
