import type { TableSettings } from '$lib/types';
import { getDefaultTableId } from '$lib/util';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createTableSettingsStore(settings: TableSettings): Writable<TableSettings> {
	const { set, subscribe, update } = writable<TableSettings>({
		tableId: settings?.tableId || getDefaultTableId(),
		showHeader: settings?.showHeader || false,
		header: settings?.header ?? '',
		showSortDescription: settings?.showSortDescription || false,
		fullWidth: settings?.fullWidth || false,
		tableLayout: settings?.tableLayout || 'fixed',
		sortBy: settings?.sortBy,
		sortDir: settings?.sortDir || 'asc',
		tableWrapper: settings?.tableWrapper || false,
		themeName: settings?.themeName || 'lighter',
		paginated: settings?.paginated || false,
		pageSize: settings?.pageSize || 5,
		pageSizeOptions: settings?.pageSizeOptions || [5, 10, 15],
		pageRangeFormat: settings?.pageRangeFormat || 'auto',
		pageNavFormat: settings?.pageNavFormat || 'auto',
		rowType: settings?.rowType || 'rows',
	});

	return { set, subscribe, update };
}
