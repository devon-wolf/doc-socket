import { Descendant } from '../../types'
import request from 'superagent';

const URL = `${process.env.API_URL}/api/v1/documents` || 'http://localhost:8080'

export const createDoc = async (title: string, doc: Descendant[]) => {
	console.log('Trying to create a doc at ', URL);
	const { body } = await request
		.post(URL)
		.send({ title, body: JSON.stringify(doc) });

	return body;
};

export const updateDoc = async (id: string, title: string, doc: Descendant[]) => {
	const { body } = await request
		.put(`${URL}/${id}`)
		.send({ title, body: JSON.stringify(doc) });
	
	return body;
};

export const deleteDoc = async (id: string) => {
	const { body } = await request
		.delete(`${URL}/${id}`);

	return body;
};

export const getAllDocs = async () => {
	const { body } = await request.get(URL);

	return body;
};

export const getDocById = async (id: string) => {
	const { body } = await request.get(`${URL}/${id}`);

	return body;
};
