import { pageWidth } from '$lib/stores/pageWidth';
import type { ComponentWidth, TableState } from '$lib/types';
import { getTableFontSizeInPixels, getTableWrapperPaddingWidth } from '$lib/util';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createComponentWidthStore(tableSettings: TableState): Readable<ComponentWidth> {
	return derived([tableSettings, pageWidth], ([$tableSettings, $pageWidth]) => {
		const getPaginationWidth = (): number =>
			$tableSettings.state.paginationLeftWidth +
			$tableSettings.state.paginationRightWidth +
			getTableFontSizeInPixels($tableSettings.tableId);

		const getMinComponentWidth = (): number =>
			Math.max(
				$tableSettings.state.captionWidth,
				$tableSettings.state.sortDescriptionWidth,
				$tableSettings.state.tableWidth,
				getPaginationWidth(),
			);

		const getPaddedComponentWidth = (): number =>
			$tableSettings.tableWrapper
				? getMinComponentWidth() + getTableWrapperPaddingWidth($tableSettings.tableId)
				: getMinComponentWidth();

		const tableExceedsViewportWidth = (): boolean => getPaddedComponentWidth() > $pageWidth.current;

		return {
			finalComponentWidth: tableExceedsViewportWidth() ? '100%' : `${getMinComponentWidth()}px`,
			finalWrapperWidth:
				$tableSettings.fullWidth || tableExceedsViewportWidth() ? '100%' : `${getPaddedComponentWidth()}px`,
		};
	});
}
