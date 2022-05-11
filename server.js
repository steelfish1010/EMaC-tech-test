const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter).use((err, req, res, next) => {
	console.log(err, '<-- server error');
	res.status(500).send({ msg: 'Internal server error' });
});
module.exports = server;
