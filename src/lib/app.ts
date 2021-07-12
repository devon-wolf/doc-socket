import express = require('express');
import cors = require('cors');
const app = express();

app.use(cors);

module.exports = app;