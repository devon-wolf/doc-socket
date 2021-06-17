import express = require('express');
import cors = require('cors');
const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html');
// })

module.exports = app;