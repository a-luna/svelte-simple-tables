import SimpleTable from '$lib/components/SimpleTable.svelte';
import type { TableSettings } from '$lib/types';
import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
import { barrelsForDateData } from '$lib/__tests__/data/getBarrelsForDate';
import { fireEvent, render } from '@testing-library/svelte';

describe('SimpleTable', () => {
	const tableId = 'all-barrels';
	const caption = 'Barrels';
	const sortBy = 'launch_speed';
	const tableSettings: TableSettings = {
		tableId,
		showHeader: true,
		header: caption,
		showSortDescription: true,
		sortBy,
		sortDir: 'desc',
		tableWrapper: true,
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageRangeFormat: 'compact',
		pageNavFormat: 'compact',
	};

	it('verify table is paginated and sortable', async () => {
		const { container, getByTestId, getAllByTestId } = render(SimpleTable, {
			data: barrelsForDateData,
			columnSettings: pfxBarrelColumnSettings,
			tableSettings,
		});
		expect(container).toMatchSnapshot('5per-p1-sort-by-number-desc');
		const table = getByTestId(tableId);
		expect(table).toHaveAttribute('aria-rowcount', barrelsForDateData.length.toString());
		const header = getByTestId(`${tableId}-caption`);
		expect(header).toHaveTextContent(caption);
		const sortDescription = getByTestId(`${tableId}-sort-description`);
		expect(sortDescription).toHaveTextContent('launch speed (descending)');

		const pageRange_5 = getByTestId('page-range');
		expect(pageRange_5).toHaveTextContent(`1-5/${barrelsForDateData.length}`);
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
		expect(pageRange_5).toHaveTextContent(`6-10/${barrelsForDateData.length}`);
		const visibleRowsPage2 = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage2).toHaveLength(5);
		expect(visibleRowsPage2[0]).toHaveAttribute('aria-rowindex', '6');
		expect(visibleRowsPage2[1]).toHaveAttribute('aria-rowindex', '7');
		expect(visibleRowsPage2[2]).toHaveAttribute('aria-rowindex', '8');
		expect(visibleRowsPage2[3]).toHaveAttribute('aria-rowindex', '9');
		expect(visibleRowsPage2[4]).toHaveAttribute('aria-rowindex', '10');
		expect(container).toMatchSnapshot('5per-p2-sort-by-number-desc');

		const lastPage = getByTestId('last');
		await fireEvent.click(lastPage);
		expect(pageRange_5).toHaveTextContent(`16-17/${barrelsForDateData.length}`);
		const visibleRowsPage4 = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage4).toHaveLength(2);
		expect(visibleRowsPage4[0]).toHaveAttribute('aria-rowindex', (barrelsForDateData.length - 1).toString());
		expect(visibleRowsPage4[1]).toHaveAttribute('aria-rowindex', barrelsForDateData.length.toString());
		expect(container).toMatchSnapshot('5per-p4-sort-by-number-desc');

		const toggleSort = getByTestId(`${tableId}-toggle-${sortBy}`);
		await fireEvent.click(toggleSort);
		expect(sortDescription).toHaveTextContent('launch speed (ascending)');
		expect(pageRange_5).toHaveTextContent(`1-5/${barrelsForDateData.length}`);
		expect(container).toMatchSnapshot('5per-p1-sort-by-number-asc');

		const changePageSize = getByTestId('change-page-size');
		await fireEvent.click(changePageSize);
		const pageSizeChoices = getByTestId('page-size-choices');
		expect(pageSizeChoices).toBeVisible();
		expect(container).toMatchSnapshot('5per-change-page-size');

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
		const pageRange_20 = getByTestId('page-range');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRowsPage1_20_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_20_asc).toHaveLength(17);
		expect(visibleRowsPage1_20_asc[0]).toHaveAttribute('aria-rowindex', '1');
		expect(visibleRowsPage1_20_asc[16]).toHaveAttribute('aria-rowindex', '17');
		expect(container).toMatchSnapshot('20per-p1-sort-by-number-asc');

		const sortBy_date = 'time_pitch_thrown_est';
		const toggleSort_date = getByTestId(`${tableId}-toggle-${sortBy_date}`);
		await fireEvent.click(toggleSort_date);
		expect(sortDescription).toHaveTextContent('time pitch thrown est (ascending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_date_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_date_asc).toHaveLength(17);
		const firstRow_sortBy_date_asc = visibleRows_sortBy_date_asc[0].children;
		const firstValue_sortBy_date_asc = firstRow_sortBy_date_asc[9];
		expect(firstValue_sortBy_date_asc).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(firstValue_sortBy_date_asc).toHaveTextContent('3:13:39 PM');
		const lastRow_sortBy_date_asc = visibleRows_sortBy_date_asc[16].children;
		const lastValue_sortBy_date_asc = lastRow_sortBy_date_asc[9];
		expect(lastValue_sortBy_date_asc).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(lastValue_sortBy_date_asc).toHaveTextContent('6:01:17 PM');
		expect(container).toMatchSnapshot('20per-p1-sort-by-date-asc');

		await fireEvent.click(toggleSort_date);
		expect(sortDescription).toHaveTextContent('time pitch thrown est (descending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_date_desc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_date_desc).toHaveLength(17);
		const firstRow_sortBy_date_desc = visibleRows_sortBy_date_desc[0].children;
		const firstValue_sortBy_date_desc = firstRow_sortBy_date_desc[9];
		expect(firstValue_sortBy_date_desc).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(firstValue_sortBy_date_desc).toHaveTextContent('6:01:17 PM');
		const lastRow_sortBy_date_desc = visibleRows_sortBy_date_desc[16].children;
		const lastValue_sortBy_date_desc = lastRow_sortBy_date_desc[9];
		expect(lastValue_sortBy_date_desc).toHaveAttribute('data-stat-name', 'time_pitch_thrown_est');
		expect(lastValue_sortBy_date_desc).toHaveTextContent('3:13:39 PM');
		expect(container).toMatchSnapshot('20per-p1-sort-by-date-desc');

		const sortBy_bool = 'inside_strike_zone';
		const toggleSort_bool = getByTestId(`${tableId}-toggle-${sortBy_bool}`);
		await fireEvent.click(toggleSort_bool);
		expect(sortDescription).toHaveTextContent('inside strike zone (ascending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_bool_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_bool_asc).toHaveLength(17);
		const firstRow_sortBy_bool_asc = visibleRows_sortBy_bool_asc[0].children;
		const firstValue_sortBy_bool_asc = firstRow_sortBy_bool_asc[12];
		expect(firstValue_sortBy_bool_asc).toHaveAttribute('data-stat-name', sortBy_bool);
		expect(firstValue_sortBy_bool_asc).toHaveTextContent('Outside');
		const lastRow_sortBy_bool_asc = visibleRows_sortBy_bool_asc[16].children;
		const lastValue_sortBy_bool_asc = lastRow_sortBy_bool_asc[12];
		expect(lastValue_sortBy_bool_asc).toHaveAttribute('data-stat-name', sortBy_bool);
		expect(lastValue_sortBy_bool_asc).toHaveTextContent('Inside');
		expect(container).toMatchSnapshot('20per-p1-sort-by-bool-asc');

		await fireEvent.click(toggleSort_bool);
		expect(sortDescription).toHaveTextContent('inside strike zone (descending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_bool_desc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_bool_desc).toHaveLength(17);
		const firstRow_sortBy_bool_desc = visibleRows_sortBy_bool_desc[0].children;
		const firstValue_sortBy_bool_desc = firstRow_sortBy_bool_desc[12];
		expect(firstValue_sortBy_bool_desc).toHaveAttribute('data-stat-name', sortBy_bool);
		expect(firstValue_sortBy_bool_desc).toHaveTextContent('Inside');
		const lastRow_sortBy_bool_desc = visibleRows_sortBy_bool_desc[16].children;
		const lastValue_sortBy_bool_desc = lastRow_sortBy_bool_desc[12];
		expect(lastValue_sortBy_bool_desc).toHaveAttribute('data-stat-name', sortBy_bool);
		expect(lastValue_sortBy_bool_desc).toHaveTextContent('Outside');
		expect(container).toMatchSnapshot('20per-p1-sort-by-bool-desc');

		const sortBy_string = 'mlbam_pitch_name';
		const toggleSort_string = getByTestId(`${tableId}-toggle-${sortBy_string}`);
		await fireEvent.click(toggleSort_string);
		expect(sortDescription).toHaveTextContent('mlbam pitch name (ascending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_string_asc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_string_asc).toHaveLength(17);
		const firstRow_sortBy_string_asc = visibleRows_sortBy_string_asc[0].children;
		const firstValue_sortBy_string_asc = firstRow_sortBy_string_asc[7];
		expect(firstValue_sortBy_string_asc).toHaveAttribute('data-stat-name', sortBy_string);
		expect(firstValue_sortBy_string_asc).toHaveTextContent('Changeup');
		const lastRow_sortBy_string_asc = visibleRows_sortBy_string_asc[16].children;
		const lastValue_sortBy_string_asc = lastRow_sortBy_string_asc[7];
		expect(lastValue_sortBy_string_asc).toHaveAttribute('data-stat-name', sortBy_string);
		expect(lastValue_sortBy_string_asc).toHaveTextContent('Slider');
		expect(container).toMatchSnapshot('20per-p1-sort-by-string-asc');

		await fireEvent.click(toggleSort_string);
		expect(sortDescription).toHaveTextContent('mlbam pitch name (descending)');
		expect(pageRange_20).toHaveTextContent(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_string_desc = getAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_string_desc).toHaveLength(17);
		const firstRow_sortBy_string_desc = visibleRows_sortBy_string_desc[0].children;
		const firstValue_sortBy_string_desc = firstRow_sortBy_string_desc[7];
		expect(firstValue_sortBy_string_desc).toHaveAttribute('data-stat-name', sortBy_string);
		expect(firstValue_sortBy_string_desc).toHaveTextContent('Slider');
		const lastRow_sortBy_string_desc = visibleRows_sortBy_string_desc[16].children;
		const lastValue_sortBy_string_desc = lastRow_sortBy_string_desc[7];
		expect(lastValue_sortBy_string_desc).toHaveAttribute('data-stat-name', sortBy_string);
		expect(lastValue_sortBy_string_desc).toHaveTextContent('Changeup');
		expect(container).toMatchSnapshot('20per-p1-sort-by-string-desc');
	});

	it('verify pagination configured for full/verbose output', async () => {
		const pageNavFormatFullSettings: TableSettings = {
			showHeader: true,
			header: caption,
			showSortDescription: true,
			sortBy,
			sortDir: 'desc',
			paginated: true,
			pageSize: 5,
			pageSizeOptions: [5, 10, 15, 20, 25],
			pageRangeFormat: 'verbose',
			pageNavFormat: 'full',
			rowType: 'barrels',
		};
		const { getByTestId } = render(SimpleTable, {
			data: barrelsForDateData,
			columnSettings: pfxBarrelColumnSettings,
			tableSettings: pageNavFormatFullSettings,
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
		expect(pageRange).toHaveTextContent(`Showing 11 to 15 of ${barrelsForDateData.length} barrels`);
	});
});
