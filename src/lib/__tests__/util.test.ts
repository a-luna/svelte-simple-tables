import { getValidPropertyNames } from '$lib/util';

describe('util', () => {
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
