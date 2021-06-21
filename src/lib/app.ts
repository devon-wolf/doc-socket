import express = require('express');
import cors = require('cors');
import Router from './controllers/documents';
const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/documents', Router);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;