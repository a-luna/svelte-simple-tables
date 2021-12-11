import type { ColumnSettings } from '$lib/types';
import type { VaxData } from './data';

export const vaxDataColumnSettings: ColumnSettings<VaxData>[] = [
	{
		propName: 'name',
		propType: 'string',
		tooltip: 'First Name',
		classList: ['text-left'],
		colValue: (data: VaxData): string => `<a href="/person/${data.personId}">${data.name}</a>`,
	},
	{
		propName: 'birthdate',
		propType: 'date',
		colValue: (data: VaxData): string => data.birthdate.toDateString(),
	},
	{
		propName: 'age',
		propType: 'number',
	},
	{
		propName: 'vaccinated',
		propType: 'boolean',
		headerText: 'Vax?',
		tooltip: 'Vaccination Status',
		classList: ['text-center'],
		colValue: (data: VaxData): string => (data.vaccinated ? '✅' : '❌'),
	},
	{
		propName: 'personId',
		propType: 'number',
		headerText: 'ID',
		sortable: false,
	},
];
