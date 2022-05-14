const { fetchRecipes, fetchRecipeById } = require('../models/recipes.model');

exports.getRecipes = async (req, res, next) => {
	const { exclude_ingredients } = req.query;
	const exclude_array = exclude_ingredients
		? exclude_ingredients.split(',')
		: [];
	try {
		const recipes = await fetchRecipes(exclude_array);
		res.send({ recipes });
	} catch (err) {
		next(err);
	}
};

exports.getRecipeById = async (req, res, next) => {
	try {
		const { recipe_id } = req.params;
		const recipe = await fetchRecipeById(recipe_id);
		res.send({ recipe });
	} catch (err) {
		next(err);
	}
};
