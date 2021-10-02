import express from 'express';
import cors from 'cors';
import { handleError, handleNotFound } from './middleware/error-handling';

const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: false }));

app.use(handleNotFound);
app.use(handleError);

export default app;
