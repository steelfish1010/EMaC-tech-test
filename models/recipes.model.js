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
