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
		const { body } = await request.get('/api/recipes?exclude_ingredients=kale');
		body.recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient.name).not.toEqual('kale');
			});
		});
	});
	test('200: query exclude_ingredients returns only recipes that exclude multiple given ingredients', async () => {
		const { body } = await request.get(
			'/api/recipes?exclude_ingredients=kale,flax,coffee'
		);
		body.recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient.name).not.toEqual('kale');
				expect(ingredient.name).not.toEqual('flax');
				expect(ingredient.name).not.toEqual('coffee');
			});
		});
	});
});
