import SimpleTable from '$lib/components/SimpleTable.svelte';
import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
import { barrelsForDateMockData } from '$lib/__tests__/data/getBarrelsForDate';
import { fireEvent, render } from '@testing-library/svelte';

describe('SimpleTable', () => {
	const tableId = 'all-barrels';
	const caption = 'Barrels';
	const sortBy = 'launch_speed';
	const settings = {
		tableId,
		showHeader: true,
		header: caption,
		showSortDescription: true,
		sortBy,
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
	it('snapshot', () => {
		const { container } = render(SimpleTable, {
			data: barrelsForDateMockData,
			columns: pfxBarrelColumnSettings,
			settings,
		});
		expect(container).toMatchSnapshot();
	});
	it('verify table is paginated and sortable', async () => {
		const { getByTestId, getAllByTestId } = render(SimpleTable, {
			data: barrelsForDateMockData,
			columns: pfxBarrelColumnSettings,
			settings,
		});
		const table = getByTestId(tableId);
		expect(table).toHaveAttribute('aria-rowcount', barrelsForDateMockData.length.toString());
		const header = getByTestId(`${tableId}-cap`);
		expect(header).toHaveTextContent(caption);
		const sortDescription = getByTestId(`${tableId}-sort-description`);
		expect(sortDescription).toHaveTextContent('launch speed (descending)');

		const pageRange = getByTestId('page-range');
		expect(pageRange).toHaveTextContent(`1-5/${barrelsForDateMockData.length}`);
		const visibleRowsPage1_desc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_desc).toHaveLength(5);
		expect(visibleRowsPage1_desc[0]).toHaveAttribute('aria-rowindex', '1');

		const pageNav_compact = getByTestId('page-nav');
		const pageNav_compact_buttons = pageNav_compact.children;
		expect(pageNav_compact_buttons).toHaveLength(4);
		expect(pageNav_compact_buttons[0]).toHaveAttribute('data-testid', 'first');
		expect(pageNav_compact_buttons[1]).toHaveAttribute('data-testid', 'prev');
		expect(pageNav_compact_buttons[2]).toHaveAttribute('data-testid', 'next');
		expect(pageNav_compact_buttons[3]).toHaveAttribute('data-testid', 'last');

		const nextPage = getByTestId('next');
		await fireEvent.click(nextPage);
		expect(pageRange).toHaveTextContent(`6-10/${barrelsForDateMockData.length}`);
		const visibleRowsPage2 = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage2).toHaveLength(5);
		expect(visibleRowsPage2[0]).toHaveAttribute('aria-rowindex', '6');

		const lastPage = getByTestId('last');
		await fireEvent.click(lastPage);
		expect(pageRange).toHaveTextContent(`46-46/${barrelsForDateMockData.length}`);
		const visibleRowsPage10 = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage10).toHaveLength(1);
		expect(visibleRowsPage10[0]).toHaveAttribute('aria-rowindex', barrelsForDateMockData.length.toString());

		const toggleSort = getByTestId(`${tableId}-toggle-${sortBy}`);
		await fireEvent.click(toggleSort);
		expect(sortDescription).toHaveTextContent('launch speed (ascending)');
		expect(pageRange).toHaveTextContent(`1-5/${barrelsForDateMockData.length}`);
		const visibleRowsPage1_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_asc).toHaveLength(5);
		expect(visibleRowsPage1_asc[0]).toHaveAttribute('aria-rowindex', '1');

		const changePageSize = getByTestId('change-page-size');
		await fireEvent.click(changePageSize);
		const pageSizeChoices = getByTestId('page-size-choices');
		expect(pageSizeChoices).toBeVisible();
		const pageSize_20 = getByTestId(`page-size-20`);
		await fireEvent.click(pageSize_20);
		expect(pageRange).toHaveTextContent(`1-20/${barrelsForDateMockData.length}`);
		const visibleRowsPage1_20_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_20_asc).toHaveLength(20);
		expect(visibleRowsPage1_20_asc[0]).toHaveAttribute('aria-rowindex', '1');
		expect(visibleRowsPage1_20_asc[19]).toHaveAttribute('aria-rowindex', '20');

		await fireEvent.click(nextPage);
		expect(pageRange).toHaveTextContent(`21-40/${barrelsForDateMockData.length}`);
		const visibleRowsPage2_20_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage2_20_asc).toHaveLength(20);
		expect(visibleRowsPage2_20_asc[0]).toHaveAttribute('aria-rowindex', '21');
		expect(visibleRowsPage2_20_asc[19]).toHaveAttribute('aria-rowindex', '40');
	});

	it('verify page-nav layout is responsive', async () => {
		const pagination = {
			...settings.pagination,
			pageSize: 20,
			pageNavLayout: 'full',
		};
		const pageNavLayoutFullSettings = {
			...settings,
			pagination,
		};
		const { getByTestId, getAllByTestId } = render(SimpleTable, {
			data: barrelsForDateMockData,
			columns: pfxBarrelColumnSettings,
			settings: pageNavLayoutFullSettings,
		});

		const pageNav_full = getByTestId('page-nav');
		const pageNav_full_buttons = pageNav_full.children;
		expect(pageNav_full_buttons).toHaveLength(5);
		expect(pageNav_full_buttons[0]).toHaveAttribute('data-testid', 'prev');
		expect(pageNav_full_buttons[1]).toHaveAttribute('data-testid', 'page1');
		expect(pageNav_full_buttons[2]).toHaveAttribute('data-testid', 'page2');
		expect(pageNav_full_buttons[3]).toHaveAttribute('data-testid', 'page3');
		expect(pageNav_full_buttons[4]).toHaveAttribute('data-testid', 'next');

		const page2 = getByTestId('page2');
		await fireEvent.click(page2);
		const pageRange = getByTestId('page-range');
		expect(pageRange).toHaveTextContent(`Showing 21 to 40 of ${barrelsForDateMockData.length} barrels`);
		const visibleRowsPage2_20_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage2_20_asc).toHaveLength(20);
		expect(visibleRowsPage2_20_asc[0]).toHaveAttribute('aria-rowindex', '21');
		expect(visibleRowsPage2_20_asc[19]).toHaveAttribute('aria-rowindex', '40');
	});
});
