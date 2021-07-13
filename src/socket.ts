import app = require('./lib/app');
import http = require('http');
import { Server } from 'socket.io';
import { Descendant } from './EditorTypes';
import { createDoc, getDocById } from './lib/services/api-requests';

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
	  origin: process.env.FRONTEND_URL,
	  methods: ["GET", "POST"],
	  allowedHeaders: ["document-events"],
	  credentials: true
	}
});

let megaDoc: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }]
	}
];

io.on('connection', socket => {
	console.log('a connection!');
	socket.emit('connection');

	socket.on('fetch request', async (id: string) => {
		console.log(`I should be fetching document ${id}`);
		const requestedDoc = await getDocById(id);
		socket.emit('socket response', requestedDoc.body);
	})

	socket.on('client change', (value: Descendant[]) => {
		megaDoc = value;
		socket.broadcast.emit('socket change', value);
	});

	socket.on('new doc', async (docTitle: string) => {
		console.log('new doc request received', docTitle);
		await createDoc(docTitle, megaDoc);
		socket.emit('socket status', 'document maybe created');
	});
});

export default server;
