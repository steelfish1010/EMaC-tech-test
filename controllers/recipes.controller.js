const { fetchRecipes } = require('../models/recipes.model');

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
