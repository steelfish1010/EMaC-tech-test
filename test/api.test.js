const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
	const { body } = await request.get('/api').expect(200);
	expect(body.message).toBe('ok');
});

describe('GET/recipes', () => {
	test('200: returns a non-empty array', async () => {
		const { body } = await request.get('/api/recipes').expect(200);
		expect(typeof body.recipes).toBe('object');
		expect(body.recipes.length).toBeGreaterThan(0);
	});
	test('200: array contains recipe objects', async () => {
		const { body } = await request.get('/api/recipes').expect(200);
		body.recipes.forEach((recipe) => {
			expect(recipe).toMatchObject({
				id: expect.any(String),
				imageUrl: expect.any(String),
				instructions: expect.any(String),
				ingredients: expect.arrayContaining([
					{
						name: expect.any(String),
						grams: expect.any(Number),
					},
				]),
			});
		});
	});
	test('200: query exclude_ingredients returns only recipes that exclude a given ingredient', async () => {
		const { body } = await request
			.get('/api/recipes?exclude_ingredients=kale')
			.expect(200);
		body.recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient.name).not.toEqual('kale');
			});
		});
	});
	test('200: query exclude_ingredients returns only recipes that exclude multiple given ingredients', async () => {
		const { body } = await request
			.get('/api/recipes?exclude_ingredients=kale,flax,coffee')
			.expect(200);
		body.recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient.name).not.toEqual('kale');
				expect(ingredient.name).not.toEqual('flax');
				expect(ingredient.name).not.toEqual('coffee');
			});
		});
	});
});

describe('GET recipes by id', () => {
	describe('successful results', () => {
		test('200: returns an object', async () => {
			const { body } = await request.get('/api/recipes/31').expect(200);
			expect(typeof body.recipe).toBe('object');
		});
		test('200: returns the requested recipe', async () => {
			const { body } = await request.get('/api/recipes/31').expect(200);
			const expected = {
				id: 'recipe-31',
				imageUrl: 'http://www.images.com/21',
				instructions: 'spin it, twist it, pull it, flick it... bop it!',
				ingredients: [
					{ name: 'strawberries', grams: 187 },
					{ name: 'kale', grams: 41 },
					{ name: 'apple juice', grams: 64 },
					{ name: 'coffee', grams: 146 },
					{ name: 'cocoa nibs', grams: 154 },
				],
			};
			expect(body.recipe).toEqual(expected);
		});
	});
	describe('error handling', () => {
		test('404: recipe ID does not exist', async () => {
			const { body } = await request.get('/api/recipes/1001').expect(404);
			expect(body.msg).toBe('Recipe not found');
		});
		test('400: recipe ID is not a number', async () => {
			const { body } = await request.get('/api/recipes/cat').expect(400);
			expect(body.msg).toBe('Invalid request');
		});
		test('404: invalid route', async () => {
			const { body } = await request.get('/api/recipe/31').expect(404);
			expect(body.msg).toBe('Route not found');
		});
	});
});
