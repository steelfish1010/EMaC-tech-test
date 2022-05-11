const { fetchRecipes } = require('../models/recipes.model');

exports.getRecipes = async (req, res, next) => {
	const { exclude_ingredients } = req.query;

	try {
		const recipes = await fetchRecipes(exclude_ingredients);
		res.send({ recipes });
	} catch (err) {
		next(err);
	}
};
