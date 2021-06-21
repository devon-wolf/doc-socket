import { Descendant, IncomingDocument } from '../../EditorTypes';
import { DocumentRow } from '../../DatabaseTypes';
import { pool } from '../utils/pool';

export default class Document {
	id : string;
	title : string;
	body : Descendant[];

	constructor({ id, title, body } : DocumentRow) {
		this.id = id;
		this.title = title;
		this.body = JSON.parse(body);
	};

	static async create({ title, body } : IncomingDocument) {
		const { rows } = await pool.query(
			`INSERT INTO documents
			(title, body)
			VALUES ($1, $2)
			RETURNING *`,
			[
				title,
				JSON.stringify(body)
			]
		);

		return new Document(rows[0]);
	};
};