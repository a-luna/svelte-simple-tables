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
	it('snapshot', async () => {
		const { container, getByTestId } = render(SimpleTable, {
			data: barrelsForDateMockData,
			columns: pfxBarrelColumnSettings,
			settings,
		});

		const changePageSize = getByTestId('change-page-size');
		await fireEvent.click(changePageSize);
		const pageSizeChoices = getByTestId('page-size-choices');
		expect(pageSizeChoices).toBeVisible();
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
		expect(visibleRowsPage1_desc[1]).toHaveAttribute('aria-rowindex', '2');
		expect(visibleRowsPage1_desc[2]).toHaveAttribute('aria-rowindex', '3');
		expect(visibleRowsPage1_desc[3]).toHaveAttribute('aria-rowindex', '4');
		expect(visibleRowsPage1_desc[4]).toHaveAttribute('aria-rowindex', '5');

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
		expect(visibleRowsPage2[1]).toHaveAttribute('aria-rowindex', '7');
		expect(visibleRowsPage2[2]).toHaveAttribute('aria-rowindex', '8');
		expect(visibleRowsPage2[3]).toHaveAttribute('aria-rowindex', '9');
		expect(visibleRowsPage2[4]).toHaveAttribute('aria-rowindex', '10');

		const lastPage = getByTestId('last');
		await fireEvent.click(lastPage);
		expect(pageRange).toHaveTextContent(`16-17/${barrelsForDateMockData.length}`);
		const visibleRowsPage4 = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage4).toHaveLength(2);
		expect(visibleRowsPage4[0]).toHaveAttribute('aria-rowindex', (barrelsForDateMockData.length - 1).toString());
		expect(visibleRowsPage4[1]).toHaveAttribute('aria-rowindex', barrelsForDateMockData.length.toString());

		const toggleSort = getByTestId(`${tableId}-toggle-${sortBy}`);
		await fireEvent.click(toggleSort);
		expect(sortDescription).toHaveTextContent('launch speed (ascending)');
		expect(pageRange).toHaveTextContent(`1-5/${barrelsForDateMockData.length}`);

		const changePageSize = getByTestId('change-page-size');
		await fireEvent.click(changePageSize);
		const pageSizeChoices = getByTestId('page-size-choices');
		expect(pageSizeChoices).toBeVisible();
		const pageSize_5 = getByTestId(`page-size-5`);
		expect(pageSize_5).not.toHaveAttribute('disabled');
		const pageSize_10 = getByTestId(`page-size-10`);
		expect(pageSize_10).not.toHaveAttribute('disabled');
		const pageSize_15 = getByTestId(`page-size-15`);
		expect(pageSize_15).not.toHaveAttribute('disabled');
		const pageSize_20 = getByTestId(`page-size-20`);
		expect(pageSize_20).not.toHaveAttribute('disabled');
		const pageSize_25 = getByTestId(`page-size-25`);
		expect(pageSize_25).toHaveAttribute('disabled');
		await fireEvent.click(pageSize_20);
		expect(pageRange).toHaveTextContent(`1-17/${barrelsForDateMockData.length}`);
		const visibleRowsPage1_20_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_20_asc).toHaveLength(17);
		expect(visibleRowsPage1_20_asc[0]).toHaveAttribute('aria-rowindex', '1');
		expect(visibleRowsPage1_20_asc[16]).toHaveAttribute('aria-rowindex', '17');

		const sortBy_Date = 'time_pitch_thrown_est';
		const toggleSort_Date = getByTestId(`${tableId}-toggle-${sortBy_Date}`);
		await fireEvent.click(toggleSort_Date);
		expect(sortDescription).toHaveTextContent('time pitch thrown est (descending)');
		expect(pageRange).toHaveTextContent(`1-17/${barrelsForDateMockData.length}`);
		const visibleRows_SortBy_Date = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_SortBy_Date).toHaveLength(17);
		const firstRow_SortBy_Date = visibleRows_SortBy_Date[0].children;
		const firstValue_SortBy_Date = firstRow_SortBy_Date[2];
		expect(firstValue_SortBy_Date).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(firstValue_SortBy_Date).toHaveTextContent('6:01:17 PM');
		const lastRow_SortBy_Date = visibleRows_SortBy_Date[16].children;
		const lastValue_SortBy_Date = lastRow_SortBy_Date[2];
		expect(lastValue_SortBy_Date).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(lastValue_SortBy_Date).toHaveTextContent('3:13:39 PM');

		const sortBy_Bool = 'inside_strike_zone';
		const toggleSort_Bool = getByTestId(`${tableId}-toggle-${sortBy_Bool}`);
		await fireEvent.click(toggleSort_Bool);
		expect(sortDescription).toHaveTextContent('inside strike zone (descending)');
		expect(pageRange).toHaveTextContent(`1-17/${barrelsForDateMockData.length}`);
		const visibleRows_SortBy_Bool = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_SortBy_Bool).toHaveLength(17);
		const firstRow_SortBy_Bool = visibleRows_SortBy_Bool[0].children;
		const firstValue_SortBy_Bool = firstRow_SortBy_Bool[12];
		expect(firstValue_SortBy_Bool).toHaveAttribute('data-stat-name', sortBy_Bool);
		expect(firstValue_SortBy_Bool).toHaveTextContent('Inside');
		const lastRow_SortBy_Bool = visibleRows_SortBy_Bool[16].children;
		const lastValue_SortBy_Bool = lastRow_SortBy_Bool[12];
		expect(lastValue_SortBy_Bool).toHaveAttribute('data-stat-name', sortBy_Bool);
		expect(lastValue_SortBy_Bool).toHaveTextContent('Outside');
	});

	it('verify page-nav layout is responsive', async () => {
		const pagination = {
			...settings.pagination,
			pageSize: 5,
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
		expect(pageNav_full_buttons).toHaveLength(6);
		expect(pageNav_full_buttons[0]).toHaveAttribute('data-testid', 'prev');
		expect(pageNav_full_buttons[1]).toHaveAttribute('data-testid', 'page1');
		expect(pageNav_full_buttons[2]).toHaveAttribute('data-testid', 'page2');
		expect(pageNav_full_buttons[3]).toHaveAttribute('data-testid', 'page3');
		expect(pageNav_full_buttons[4]).toHaveAttribute('data-testid', 'page4');
		expect(pageNav_full_buttons[5]).toHaveAttribute('data-testid', 'next');

		const page3 = getByTestId('page3');
		await fireEvent.click(page3);
		const pageRange = getByTestId('page-range');
		expect(pageRange).toHaveTextContent(`Showing 11 to 15 of ${barrelsForDateMockData.length} barrels`);
		const visibleRowsPage3_5_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage3_5_asc).toHaveLength(5);
		expect(visibleRowsPage3_5_asc[0]).toHaveAttribute('aria-rowindex', '11');
		expect(visibleRowsPage3_5_asc[4]).toHaveAttribute('aria-rowindex', '15');
	});
});
