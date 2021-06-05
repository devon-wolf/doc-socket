import express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

module.exports = app;