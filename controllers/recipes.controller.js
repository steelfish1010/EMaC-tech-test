const { fetchRecipes } = require('../models/recipes.model');

exports.getRecipes = async (req, res, next) => {
	try {
		const recipes = await fetchRecipes();
		console.log(recipes, '<< recipes');
		res.send({ recipes });
	} catch (err) {
		next(err);
	}
};
