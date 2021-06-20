import { Router } from 'express';

module.exports = Router()
	.post('/', (req, res, next) => {
		console.log('post');
	});