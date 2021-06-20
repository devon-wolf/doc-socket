import express = require('express');
import cors = require('cors');
const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/documents', require('./controllers/documents'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;