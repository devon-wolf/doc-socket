const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');

describe('document routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	it('adds a document to the database', () => {
		const docBody = [
			{
				type: 'paragraph',
				children: [{ text: 'A line of text in a paragraph' }]
			}
		];

		const docToSend = {
			title: 'New Document Title',
			body: docBody
		};

		return request(app)
			.post('/api/v1/documents')
			.send(docToSend)
			.then(response => expect(response).toEqual({
				...docToSend,
				id: 1
			}));
	});
});