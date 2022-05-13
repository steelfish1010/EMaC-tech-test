const recipesRouter = require('./recipes.router');

const apiRouter = require('express').Router();

apiRouter
	.use('/recipes', recipesRouter)
	.get('/', (_, res) => {
		res.json({ message: 'ok' });
	})
	.all('/*', (_, res) => {
		res.status(404).send({ message: 'Route not found' });
	});

module.exports = apiRouter;
