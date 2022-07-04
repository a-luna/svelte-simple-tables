import SimpleTable from '$lib/components/SimpleTable.svelte';
import type { TableSettings } from '$lib/types';
import { pfxBarrelColumnSettings } from '$lib/__tests__/data/columnSettings';
import { barrelsForDateData } from '$lib/__tests__/data/getBarrelsForDate';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const ResizeObserverMock = vi.fn(() => ({
	disconnect: vi.fn(),
	observe: vi.fn(),
	unobserve: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('SimpleTable', () => {
	let container: HTMLElement;
	let table: HTMLElement;
	let user: UserEvent;
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

	beforeEach(() => {
		user = userEvent.setup();
	});

	afterEach(() => {
		container.firstChild?.remove();
		table = screen.queryByTestId(tableId);
		expect(table).toBeFalsy();
	});

	test('verify table is paginated and sortable', async () => {
		({ container } = render(SimpleTable, {
			data: barrelsForDateData,
			columnSettings: pfxBarrelColumnSettings,
			tableSettings,
		}));
		table = await screen.findByTestId(tableId);
		expect(table.innerHTML).toContain(`aria-rowcount="${barrelsForDateData.length}"`);
		const header = await screen.findByTestId(`${tableId}-caption`);
		expect(header.innerHTML).toContain(caption);
		const sortDescription = await screen.findByTestId(`${tableId}-sort-description`);
		expect(sortDescription.innerHTML).toContain('launch speed (descending)');

		const pageRange_5 = await screen.findByTestId('page-range');
		expect(pageRange_5.innerHTML).toContain(`1-5/${barrelsForDateData.length}`);
		const visibleRowsPage1_desc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_desc).toHaveLength(5);
		expect(visibleRowsPage1_desc[0].outerHTML).toContain('aria-rowindex="1"');
		expect(visibleRowsPage1_desc[1].outerHTML).toContain('aria-rowindex="2"');
		expect(visibleRowsPage1_desc[2].outerHTML).toContain('aria-rowindex="3"');
		expect(visibleRowsPage1_desc[3].outerHTML).toContain('aria-rowindex="4"');
		expect(visibleRowsPage1_desc[4].outerHTML).toContain('aria-rowindex="5"');

		const pageNav_compact = await screen.findByTestId('page-nav');
		const pageNav_compact_buttons = pageNav_compact.children;
		expect(pageNav_compact_buttons).toHaveLength(4);
		expect(pageNav_compact_buttons[0].outerHTML).toContain('data-testid="first"');
		expect(pageNav_compact_buttons[1].outerHTML).toContain('data-testid="prev"');
		expect(pageNav_compact_buttons[2].outerHTML).toContain('data-testid="next"');
		expect(pageNav_compact_buttons[3].outerHTML).toContain('data-testid="last"');

		const nextPage = await screen.findByTestId('next');
		await user.click(nextPage);
		expect(pageRange_5.innerHTML).toContain(`6-10/${barrelsForDateData.length}`);
		const visibleRowsPage2 = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage2).toHaveLength(5);
		expect(visibleRowsPage2[0].outerHTML).toContain('aria-rowindex="6"');
		expect(visibleRowsPage2[1].outerHTML).toContain('aria-rowindex="7"');
		expect(visibleRowsPage2[2].outerHTML).toContain('aria-rowindex="8"');
		expect(visibleRowsPage2[3].outerHTML).toContain('aria-rowindex="9"');
		expect(visibleRowsPage2[4].outerHTML).toContain('aria-rowindex="10"');
		expect(container).toMatchSnapshot('5per-p2-sort-by-number-desc');

		const lastPage = await screen.findByTestId('last');
		await user.click(lastPage);
		expect(pageRange_5.innerHTML).toContain(`16-17/${barrelsForDateData.length}`);
		const visibleRowsPage4 = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage4).toHaveLength(2);
		expect(visibleRowsPage4[0].outerHTML).toContain(`aria-rowindex="${(barrelsForDateData.length - 1).toString()}"`);
		expect(visibleRowsPage4[1].outerHTML).toContain(`aria-rowindex="${barrelsForDateData.length.toString()}"`);
		expect(container).toMatchSnapshot('5per-p4-sort-by-number-desc');

		const prevPage = await screen.findByTestId('prev');
		await user.click(prevPage);
		expect(pageRange_5.innerHTML).toContain(`11-15/${barrelsForDateData.length}`);
		const visibleRowsPage3 = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage3).toHaveLength(5);
		expect(visibleRowsPage3[0].outerHTML).toContain('aria-rowindex="11"');
		expect(visibleRowsPage3[1].outerHTML).toContain('aria-rowindex="12"');
		expect(visibleRowsPage3[2].outerHTML).toContain('aria-rowindex="13"');
		expect(visibleRowsPage3[3].outerHTML).toContain('aria-rowindex="14"');
		expect(visibleRowsPage3[4].outerHTML).toContain('aria-rowindex="15"');
		expect(container).toMatchSnapshot('5per-p3-sort-by-number-desc');

		const changePageSize = await screen.findByTestId('change-page-size');
		await user.click(changePageSize);
		const pageSizeChoices = await screen.findByTestId('page-size-choices');
		expect(pageSizeChoices).toBeTruthy();
		expect(container).toMatchSnapshot('5per-change-page-size');

		const pageSize_5 = await screen.findByTestId(`page-size-5`);
		expect(pageSize_5.outerHTML).not.toContain('disabled');
		const pageSize_10 = await screen.findByTestId(`page-size-10`);
		expect(pageSize_10.outerHTML).not.toContain('disabled');
		const pageSize_15 = await screen.findByTestId(`page-size-15`);
		expect(pageSize_15.outerHTML).not.toContain('disabled');
		const pageSize_20 = await screen.findByTestId(`page-size-20`);
		expect(pageSize_20.outerHTML).not.toContain('disabled');
		const pageSize_25 = await screen.findByTestId(`page-size-25`);
		expect(pageSize_25.outerHTML).toContain('disabled');
		await user.click(pageSize_20);
		const pageRange_20 = await screen.findByTestId('page-range');
		expect(pageRange_20.outerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRowsPage1_20_asc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRowsPage1_20_asc).toHaveLength(17);
		expect(visibleRowsPage1_20_asc[0].outerHTML).toContain('aria-rowindex="1"');
		expect(visibleRowsPage1_20_asc[16].outerHTML).toContain('aria-rowindex="17"');
		expect(container).toMatchSnapshot('20per-p1-sort-by-number-asc');

		const sortBy_date = 'time_pitch_thrown_est';
		const toggleSort_date = await screen.findByTestId(`${tableId}-toggle-${sortBy_date}`);
		await user.click(toggleSort_date);
		expect(sortDescription.innerHTML).toContain('time pitch thrown est (ascending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_date_asc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_date_asc).toHaveLength(17);
		const firstRow_sortBy_date_asc = visibleRows_sortBy_date_asc[0].children;
		const firstValue_sortBy_date_asc = firstRow_sortBy_date_asc[9];
		expect(firstValue_sortBy_date_asc.outerHTML).toContain(`data-stat-name="${sortBy_date}"`);
		expect(firstValue_sortBy_date_asc.innerHTML).toContain('3:13:39 PM');
		const lastRow_sortBy_date_asc = visibleRows_sortBy_date_asc[16].children;
		const lastValue_sortBy_date_asc = lastRow_sortBy_date_asc[9];
		expect(lastValue_sortBy_date_asc.outerHTML).toContain(`data-stat-name="${sortBy_date}"`);
		expect(lastValue_sortBy_date_asc.innerHTML).toContain('6:01:17 PM');
		expect(container).toMatchSnapshot('20per-p1-sort-by-date-asc');

		await user.click(toggleSort_date);
		expect(sortDescription.innerHTML).toContain('time pitch thrown est (descending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_date_desc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_date_desc).toHaveLength(17);
		const firstRow_sortBy_date_desc = visibleRows_sortBy_date_desc[0].children;
		const firstValue_sortBy_date_desc = firstRow_sortBy_date_desc[9];
		expect(firstValue_sortBy_date_desc.outerHTML).toContain(`data-stat-name="${sortBy_date}"`);
		expect(firstValue_sortBy_date_desc.innerHTML).toContain('6:01:17 PM');
		const lastRow_sortBy_date_desc = visibleRows_sortBy_date_desc[16].children;
		const lastValue_sortBy_date_desc = lastRow_sortBy_date_desc[9];
		expect(lastValue_sortBy_date_desc.outerHTML).toContain(`data-stat-name="${sortBy_date}"`);
		expect(lastValue_sortBy_date_desc.innerHTML).toContain('3:13:39 PM');
		expect(container).toMatchSnapshot('20per-p1-sort-by-date-desc');

		const sortBy_bool = 'inside_strike_zone';
		const toggleSort_bool = await screen.findByTestId(`${tableId}-toggle-${sortBy_bool}`);
		await user.click(toggleSort_bool);
		expect(sortDescription.innerHTML).toContain('inside strike zone (ascending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_bool_asc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_bool_asc).toHaveLength(17);
		const firstRow_sortBy_bool_asc = visibleRows_sortBy_bool_asc[0].children;
		const firstValue_sortBy_bool_asc = firstRow_sortBy_bool_asc[12];
		expect(firstValue_sortBy_bool_asc.outerHTML).toContain(`data-stat-name="${sortBy_bool}"`);
		expect(firstValue_sortBy_bool_asc.innerHTML).toContain('Outside');
		const lastRow_sortBy_bool_asc = visibleRows_sortBy_bool_asc[16].children;
		const lastValue_sortBy_bool_asc = lastRow_sortBy_bool_asc[12];
		expect(lastValue_sortBy_bool_asc.outerHTML).toContain(`data-stat-name="${sortBy_bool}"`);
		expect(lastValue_sortBy_bool_asc.innerHTML).toContain('Inside');
		expect(container).toMatchSnapshot('20per-p1-sort-by-bool-asc');

		await user.click(toggleSort_bool);
		expect(sortDescription.innerHTML).toContain('inside strike zone (descending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_bool_desc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_bool_desc).toHaveLength(17);
		const firstRow_sortBy_bool_desc = visibleRows_sortBy_bool_desc[0].children;
		const firstValue_sortBy_bool_desc = firstRow_sortBy_bool_desc[12];
		expect(firstValue_sortBy_bool_desc.outerHTML).toContain(`data-stat-name="${sortBy_bool}"`);
		expect(firstValue_sortBy_bool_desc.innerHTML).toContain('Inside');
		const lastRow_sortBy_bool_desc = visibleRows_sortBy_bool_desc[16].children;
		const lastValue_sortBy_bool_desc = lastRow_sortBy_bool_desc[12];
		expect(lastValue_sortBy_bool_desc.outerHTML).toContain(`data-stat-name="${sortBy_bool}"`);
		expect(lastValue_sortBy_bool_desc.innerHTML).toContain('Outside');
		expect(container).toMatchSnapshot('20per-p1-sort-by-bool-desc');

		const sortBy_string = 'mlbam_pitch_name';
		const toggleSort_string = await screen.findByTestId(`${tableId}-toggle-${sortBy_string}`);
		await user.click(toggleSort_string);
		expect(sortDescription.innerHTML).toContain('mlbam pitch name (ascending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_string_asc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_string_asc).toHaveLength(17);
		const firstRow_sortBy_string_asc = visibleRows_sortBy_string_asc[0].children;
		const firstValue_sortBy_string_asc = firstRow_sortBy_string_asc[7];
		expect(firstValue_sortBy_string_asc.outerHTML).toContain(`data-stat-name="${sortBy_string}"`);
		expect(firstValue_sortBy_string_asc.innerHTML).toContain('Changeup');
		const lastRow_sortBy_string_asc = visibleRows_sortBy_string_asc[16].children;
		const lastValue_sortBy_string_asc = lastRow_sortBy_string_asc[7];
		expect(lastValue_sortBy_string_asc.outerHTML).toContain(`data-stat-name="${sortBy_string}"`);
		expect(lastValue_sortBy_string_asc.innerHTML).toContain('Slider');
		expect(container).toMatchSnapshot('20per-p1-sort-by-string-asc');

		await user.click(toggleSort_string);
		expect(sortDescription.innerHTML).toContain('mlbam pitch name (descending)');
		expect(pageRange_20.innerHTML).toContain(`1-17/${barrelsForDateData.length}`);
		const visibleRows_sortBy_string_desc = await screen.findAllByTestId(`${tableId}-row`);
		expect(visibleRows_sortBy_string_desc).toHaveLength(17);
		const firstRow_sortBy_string_desc = visibleRows_sortBy_string_desc[0].children;
		const firstValue_sortBy_string_desc = firstRow_sortBy_string_desc[7];
		expect(firstValue_sortBy_string_desc.outerHTML).toContain(`data-stat-name="${sortBy_string}"`);
		expect(firstValue_sortBy_string_desc.innerHTML).toContain('Slider');
		const lastRow_sortBy_string_desc = visibleRows_sortBy_string_desc[16].children;
		const lastValue_sortBy_string_desc = lastRow_sortBy_string_desc[7];
		expect(lastValue_sortBy_string_desc.outerHTML).toContain(`data-stat-name="${sortBy_string}"`);
		expect(lastValue_sortBy_string_desc.innerHTML).toContain('Changeup');
		expect(container).toMatchSnapshot('20per-p1-sort-by-string-desc');
	});

	// test('verify pagination configured for full/verbose output', async () => {
	// 	const pageNavFormatFullSettings: TableSettings = {
	// 		showHeader: true,
	// 		header: caption,
	// 		showSortDescription: true,
	// 		sortBy,
	// 		sortDir: 'desc',
	// 		paginated: true,
	// 		pageSize: 5,
	// 		pageSizeOptions: [5, 10, 15, 20, 25],
	// 		pageRangeFormat: 'verbose',
	// 		pageNavFormat: 'full',
	// 		rowType: 'barrels',
	// 	};
	// 	const { await screen.findByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: pageNavFormatFullSettings,
	// 	});

	// 	const pageNav_full = await screen.findByTestId('page-nav');
	// 	const pageNav_full_buttons = pageNav_full.children;
	// 	expect(pageNav_full_buttons).toHaveLength(6);
	// 	expect(pageNav_full_buttons[0]).toHaveAttribute('data-testid', 'prev');
	// 	expect(pageNav_full_buttons[1]).toHaveAttribute('data-testid', 'page1');
	// 	expect(pageNav_full_buttons[2]).toHaveAttribute('data-testid', 'page2');
	// 	expect(pageNav_full_buttons[3]).toHaveAttribute('data-testid', 'page3');
	// 	expect(pageNav_full_buttons[4]).toHaveAttribute('data-testid', 'page4');
	// 	expect(pageNav_full_buttons[5]).toHaveAttribute('data-testid', 'next');

	// 	const page3 = await screen.findByTestId('page3');
	// 	await user.click(page3);
	// 	const pageRange = await screen.findByTestId('page-range');
	// 	expect(pageRange).toHaveTextContent(`Showing 11 to 15 of ${barrelsForDateData.length} barrels`);
	// });

	// test('verify sort function when table is not sorted, sortDir = descending', () => {
	// 	const basicTableSettings: TableSettings = {
	// 		tableId: 'unsorted',
	// 		sortDir: 'desc',
	// 	};
	// 	const { await screen.findByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: basicTableSettings,
	// 	});
	// });

	// test('verify sort function when table is not sorted, sortDir = ascending', () => {
	// 	const basicTableSettings: TableSettings = {
	// 		tableId: 'unsorted',
	// 		sortDir: 'asc',
	// 	};
	// 	const { await screen.findByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: basicTableSettings,
	// 	});
	// });

	// test('verify sort function when sortType = string and sortDir = asc', () => {
	// 	const basicTableSettings: TableSettings = {
	// 		tableId: 'sort-by-string-asc',
	// 		sortBy: 'batter_name',
	// 		sortDir: 'asc',
	// 	};
	// 	const { await screen.findByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: basicTableSettings,
	// 	});
	// });

	// test('verify sort function when sortType = date and sortDir = desc', () => {
	// 	const basicTableSettings: TableSettings = {
	// 		tableId: 'sort-by-date-desc',
	// 		sortBy: 'time_pitch_thrown_est',
	// 		sortDir: 'desc',
	// 	};
	// 	const { await screen.findByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: basicTableSettings,
	// 	});
	// });

	// test('verify tableState.reset method', () => {
	// 	const tableState = createTableStateStore(barrelsForDateData.length, tableSettings);
	// 	const { await screen.findByTestId, await screen.findAllByTestId } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings,
	// 		tableState,
	// 	});
	// 	const table = await screen.findByTestId(tableId);
	// 	expect(table).toHaveAttribute('aria-rowcount', barrelsForDateData.length.toString());
	// 	const visibleRowsPage1_pre = await screen.findAllByTestId(`${tableId}-row`);
	// 	expect(visibleRowsPage1_pre).toHaveLength(5);

	// 	const changedData = barrelsForDateData.slice(5);
	// 	const changedTotalRows = changedData.length;
	// 	const changedPageSize = 10;
	// 	tableState.reset(changedTotalRows, changedPageSize);
	// });

	// test('verify clickableRows property of TableSettings object, clickableRows = true', async () => {
	// 	const clickableRowsTableSettings: TableSettings = {
	// 		clickableRows: true,
	// 		animateSorting: true,
	// 		...tableSettings,
	// 	};
	// 	const { await screen.findAllByTestId, component } = render(SimpleTable, {
	// 		data: barrelsForDateData,
	// 		columnSettings: pfxBarrelColumnSettings,
	// 		tableSettings: clickableRowsTableSettings,
	// 	});

	// 	const visibleRowsPage1 = await screen.findAllByTestId(`${tableId}-row`);
	// 	expect(visibleRowsPage1.length).toBeGreaterThanOrEqual(2);
	// 	const firstRow = visibleRowsPage1[0];
	// 	const mockEvent = jest.fn();
	// 	component.$on('rowClicked', (event) => mockEvent(event.detail));

	// 	await user.click(firstRow);
	// 	expect(mockEvent).toHaveBeenCalledTimes(1);
	// 	expect(mockEvent.mock.calls[0][0]['at_bat_id']).toEqual('KCA202110030_01_KCA_663804_MIN_593934_0');

	// 	const secondRow = visibleRowsPage1[1];
	// 	await user.click(secondRow);
	// 	expect(mockEvent).toHaveBeenCalledTimes(2);
	// 	expect(mockEvent.mock.calls[1][0]['at_bat_id']).toEqual('LAN202110030_04_LAN_621111_MIL_642133_0');
	// });
});
