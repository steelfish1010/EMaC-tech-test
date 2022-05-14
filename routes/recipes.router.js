const {
	getRecipes,
	getRecipeById,
} = require('../controllers/recipes.controller');

const recipesRouter = require('express').Router();

recipesRouter
	.get('/', getRecipes)
	.get('/:recipe_id', getRecipeById)
	.all('/*', (_, res) => {
		res.status(404).send({ message: 'Route not found' });
	});

module.exports = recipesRouter;
