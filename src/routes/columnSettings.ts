import type { ColumnSettings } from '$lib/types';
import type { VaxData } from './data';

export const vaxDataColumnSettings: ColumnSettings<VaxData>[] = [
	{
		propName: 'name',
		tooltip: 'First Name',
		classList: ['text-left'],
		colValue: (data: VaxData): string => `<a href="/person/${data.personId}">${data.name}</a>`,
	},
	{
		propName: 'birthdate',
		colValue: (data: VaxData): string => data.birthdate.toDateString(),
	},
	{
		propName: 'age',
	},
	{
		propName: 'vaccinated',
		headerText: 'Vax?',
		tooltip: 'Vaccination Status',
		classList: ['text-center'],
		colValue: (data: VaxData): string => (data.vaccinated ? '✅' : '❌'),
	},
	{
		propName: 'personId',
		headerText: 'ID',
		sortable: false,
	},
];
