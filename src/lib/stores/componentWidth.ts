import { pageWidth } from '$lib/stores/pageWidth';
import type { TableSettings, TableStateStore } from '$lib/types';
import { getTableFontSizeInPixels } from '$lib/util';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createComponentWidthStore(
	tableSettings: Writable<TableSettings>,
	tableState: TableStateStore,
): Readable<string> {
	return derived([tableSettings, tableState, pageWidth], ([$tableSettings, $tableState, $pageWidth]) => {
		const getWrapperPaddingAndBorder = (): number =>
			$tableSettings.tableWrapper ? 2 * getTableFontSizeInPixels($tableState.tableId) - 2 : 0;

		const getMaxWidthWithoutScrolling = (): number => $pageWidth.current - getWrapperPaddingAndBorder();

		const getPaginationWidth = (): number =>
			$tableState.paginationLeftWidth +
			$tableState.paginationRightWidth +
			getTableFontSizeInPixels($tableState.tableId);

		const getMinComponentWidth = (): number =>
			Math.max(
				$tableState.captionWidth,
				$tableState.sortDescriptionWidth,
				$tableState.tableWidth,
				getPaginationWidth(),
			);

		const tableExceedsViewportWidth = (): boolean => getMinComponentWidth() > getMaxWidthWithoutScrolling();

		const useAutoSize = (): boolean =>
			tableExceedsViewportWidth() || $tableSettings.fullWidth || $tableSettings.tableLayout === 'auto';

		return useAutoSize() ? 'auto' : `${getMinComponentWidth()}px`;
	});
}
