const { filterArrayMultipleTimes } = require('../utils/utils');

describe('filterArrayMultipleTimes', () => {
	test('when called with an array, returns a copy of that array', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		expect(filterArrayMultipleTimes(array)).toEqual(array);
	});
	test('returns a new array, distinct in memory from the input', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		expect(filterArrayMultipleTimes(array)).not.toBe(array);
	});
	test('when called with a single exclude value, returns a correctly filtered array', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		const exclude_value = ['apples'];
		const expected = [{ name: 'bananas' }, { name: 'oranges' }];
		expect(filterArrayMultipleTimes(array, exclude_value)).toEqual(expected);
	});
	test('when called with 2 exclude values, returns a correctly filtered array', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		const exclude_values = ['apples', 'bananas'];
		const expected = [{ name: 'oranges' }];
		expect(filterArrayMultipleTimes(array, exclude_values)).toEqual(expected);
	});
	test('when called with multiple exclude values, returns a correctly filtered array', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
			{ name: 'oats' },
			{ name: 'coffee' },
			{ name: 'blueberries' },
			{ name: 'cream' },
		];
		const exclude_values = [
			'apples',
			'bananas',
			'blueberries',
			'coffee',
			'oats',
		];
		const expected = [{ name: 'oranges' }, { name: 'cream' }];
		expect(filterArrayMultipleTimes(array, exclude_values)).toEqual(expected);
	});
	test('correctly handles exclude values that are not in the array', () => {
		const array = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		const exclude_values = ['apples', 'bicycles', 'oranges'];
		const expected = [{ name: 'bananas' }];
		expect(filterArrayMultipleTimes(array, exclude_values)).toEqual(expected);
	});
	test('does not mutate input array', () => {
		const input = [
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		];
		const exclude_values = ['apples', 'bananas'];
		filterArrayMultipleTimes(input, exclude_values);
		expect(input).toEqual([
			{ name: 'apples' },
			{ name: 'bananas' },
			{ name: 'oranges' },
		]);
	});
});
