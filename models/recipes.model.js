const fs = require('fs/promises');

exports.fetchRecipes = async (exclude_ingredients) => {
	const recipes = await fs.readFile('./data/data.json', 'utf-8');
	const filteredRecipes = JSON.parse(recipes).filter((recipe) => {
		return recipe.ingredients.every(
			(ingredient) => ingredient.name !== exclude_ingredients
		);
	});

	return filteredRecipes;
};
