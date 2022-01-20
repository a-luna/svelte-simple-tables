import { getDefaultColHeader, getValidPropertyNames } from '$lib/util';

describe('util', () => {
	it('verify getDefaultColHeader', () => {
		const propertyCamelCase = 'playerName';
		const propertySnakeCase = 'player-name';
		const expectedColHeader = 'Player Name';
		expect(getDefaultColHeader(propertyCamelCase)).toEqual(expectedColHeader);
		expect(getDefaultColHeader(propertySnakeCase)).toEqual(expectedColHeader);
	});

	it('verify getValidPropertyNames', () => {
		let property = 'borderLeftWidth';
		let [camelCase, snakeCase] = getValidPropertyNames(property);
		expect(camelCase).toEqual(property);
		expect(snakeCase).toEqual('border-left-width');

		property = 'color';
		[camelCase, snakeCase] = getValidPropertyNames(property);
		expect(camelCase).toEqual(property);
		expect(snakeCase).toEqual(property);
	});
});
