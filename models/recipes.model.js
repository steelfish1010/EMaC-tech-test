const fs = require('fs/promises');

exports.fetchRecipes = async () => {
	const recipes = await fs.readFile('./data/data.json', 'utf-8');
	return JSON.parse(recipes);
};
