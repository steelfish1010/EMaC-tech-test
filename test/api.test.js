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
		expect(typeof body.data).toBe('Object');
		expect(body.data.length).toBeGreaterThan(0);
	});
});
