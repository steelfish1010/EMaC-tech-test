const fs = require('fs/promises');
const { filterArrayMultipleTimes } = require('../utils/utils');

exports.fetchRecipes = async (excludes) => {
	const recipes = await fs.readFile('./data/data.json', 'utf-8');
	const parsedRecipes = JSON.parse(recipes);
	if (excludes.length === 0) {
		return parsedRecipes;
	} else {
		const filteredRecipes = parsedRecipes.map((recipe) => {
			const filteredIngredients = filterArrayMultipleTimes(
				recipe.ingredients,
				excludes
			);
			return { ...recipe, ingredients: filteredIngredients };
		});
		return filteredRecipes;
	}
};

exports.fetchRecipeById = async (recipe_id) => {
	if (!Number(recipe_id))
		return Promise.reject({ status: 400, msg: 'Invalid request' });
	const recipes = await fs.readFile('./data/data.json', 'utf-8');
	const recipe = JSON.parse(recipes).filter((recipe) => {
		return recipe.id === `recipe-${recipe_id}`;
	});

	return recipe.length === 0
		? Promise.reject({ status: 404, msg: 'Recipe not found' })
		: recipe[0];
};
