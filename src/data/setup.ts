import { Pool } from "pg";
import fs from 'fs/promises';

export const setup = (pool : Pool) => {
	return fs.readFile(`${__dirname}/../../sql/setup.sql`, { encoding: 'utf-8' })
		.then(sql => pool.query(sql));
};