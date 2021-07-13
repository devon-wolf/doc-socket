import app = require('./lib/app');
import http = require('http');
import { Server } from 'socket.io';
import { Descendant, ActiveDocuments } from './types';
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

const activeDocuments: ActiveDocuments = {};

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
		if (activeDocuments[id]) {
			socket.emit('socket response', { id, newValue: activeDocuments[id].body })
		}
		else {
			const requestedDoc = await getDocById(id);
			activeDocuments[id] = requestedDoc;
			socket.emit('socket response', { id, newValue: requestedDoc.body });
		}
	});

	socket.on('client change', (update: { id: string, newValue: Descendant[] }) => {
		const { id, newValue } = update;
		const currentDoc = activeDocuments[id];
		currentDoc.body = newValue;
		socket.broadcast.emit('socket change', {id, newValue});
	});

	socket.on('new doc', async (docTitle: string) => {
		console.log('new doc request received', docTitle);
		await createDoc(docTitle, megaDoc);
		socket.emit('socket status', 'document maybe created');
	});
});

export default server;
