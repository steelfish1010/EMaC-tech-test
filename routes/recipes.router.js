const {
	getRecipes,
	getRecipeById,
} = require('../controllers/recipes.controller');

const recipesRouter = require('express').Router();

recipesRouter.get('/', getRecipes).get('/:recipe_id', getRecipeById);

module.exports = recipesRouter;
