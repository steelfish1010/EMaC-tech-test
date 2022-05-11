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
});
