const { getRecipes } = require('../controllers/recipes.controller');

const recipesRouter = require('express').Router();

recipesRouter.get('/', getRecipes).all('/*', (_, res) => {
	res.status(404).send({ message: 'Route not found' });
});

module.exports = recipesRouter;
