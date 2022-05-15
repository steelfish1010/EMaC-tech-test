const recipesRouter = require('./recipes.router');

const apiRouter = require('express').Router();

apiRouter.use('/recipes', recipesRouter).get('/', (_, res) => {
	res.json({ message: 'ok' });
});

module.exports = apiRouter;
