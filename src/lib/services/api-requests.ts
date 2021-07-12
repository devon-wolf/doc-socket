import { Descendant } from '../../EditorTypes'
import request from 'superagent';

const URL = process.env.API_URL || 'http://localhost:8080'

export const createDoc = async (doc: Descendant[]) => {
	const { body } = await request
		.post(URL)
		.send(JSON.stringify(doc));

	return body;
};

export const updateDoc = async (id: string, doc: Descendant[]) => {
	const { body } = await request
		.put(`${URL}/${id}`)
		.send(JSON.stringify(doc));
	
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
