const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);

server.all('/*', (_, res) => {
	res.status(404).send({ msg: 'Route not found' });
});

// Handle custom errors
server.use((err, req, res, next) => {
	if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
});

// Handle all errors not captured elsewhere
server.use((err, req, res, next) => {
	console.log(err, '<-- server error');
	res.status(500).send({ msg: 'Internal server error' });
});

module.exports = server;
