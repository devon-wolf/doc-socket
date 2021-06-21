import { Router } from 'express';
import Document from '../models/Document';

export default Router()
	.get('/', (req, res, next) => {
		console.log('get request!')
		res.send('Hi there!');
	});
	// .post('/', (req, res, next) => {
	// 	console.log('received a post request, not doing anything');
	// 	Document
	// 		.create(req.body)
	// 		.then(document => res.send(document))
	// 		.catch(next);
	// });