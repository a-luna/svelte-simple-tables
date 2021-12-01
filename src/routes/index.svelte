<script lang="ts">
	import SimpleTable from '$lib/components/SimpleTable.svelte';
	import type { TableSettings } from '$lib/types';
	import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
	import { barrelsForDateMockData } from '$lib/__tests__/data/getBarrelsForDate';

	const settings: TableSettings = {
		showHeader: true,
		header: 'Barrels',
		showSortDescription: true,
		sortBy: 'time_pitch_thrown_est',
		sortDir: 'desc',
		paginated: true,
		pagination: {
			pageSize: 5,
			pageSizeOptions: [5, 10, 15, 20, 25],
			pageNavLayout: 'compact',
			rowTypeSingle: 'barrel',
			rowTypePlural: 'barrels',
		},
	};
</script>

<SimpleTable data={barrelsForDateMockData} columns={pfxBarrelColumnSettings} {settings} />
