import { pageWidth } from '$lib/stores';
import type { ComponentWidth, TableState } from '$lib/types';
import { getTableFontSizeInPixels, getTableWrapperPaddingWidth } from '$lib/util';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

export function createComponentWidthStore<R>(tableState: TableState<R>): Readable<ComponentWidth> {
	return derived([tableState, pageWidth], ([$tableState, $pageWidth]) => {
		const getPaginationWidth = (): number =>
			$tableState.state.paginationLeftWidth +
			$tableState.state.paginationRightWidth +
			getTableFontSizeInPixels($tableState.tableId);

		const getMinComponentWidth = (): number =>
			Math.max(
				$tableState.state.captionWidth,
				$tableState.state.sortDescriptionWidth,
				$tableState.state.tableWidth,
				getPaginationWidth(),
			);

		const getPaddedComponentWidth = (): number =>
			$tableState.tableWrapper
				? getMinComponentWidth() + getTableWrapperPaddingWidth($tableState.tableId)
				: getMinComponentWidth();

		const tableExceedsViewportWidth = (): boolean => getPaddedComponentWidth() > $pageWidth.current;
		const tableExceedsContainerWidth = (): boolean => getPaddedComponentWidth() > $tableState.state.containerWidth;
		const fitToContainer = (): boolean =>
			tableExceedsContainerWidth() || tableExceedsViewportWidth() || $tableState.expandToContainerWidth;

		return {
			finalComponentWidth: fitToContainer() ? '100%' : `${getMinComponentWidth()}px`,
			finalWrapperWidth: fitToContainer() ? '100%' : 'min-content',
		};
	});
}
