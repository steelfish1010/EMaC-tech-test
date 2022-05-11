const recipesRouter = require('express').Router();

recipeRouter
	.get('/', (_, res) => {
	
	})
	.all('/*', (_, res) => {
		res.status(404).send({ message: 'Route not found' });
	});

module.exports = recipesRouter;
