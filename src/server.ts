import app = require('./lib/app');
import http = require('http');
import { Server } from 'socket.io';
import { Descendant } from './EditorTypes';

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
	  origin: process.env.FRONTEND_URL,
	  methods: ["GET", "POST"],
	  allowedHeaders: ["document-events"],
	  credentials: true
	}
  });

const PORT = process.env.PORT || 7890;

let megaDoc : Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: 'A line of text in a paragraph' }]
	}
];

io.on('connection', socket => {
	console.log('a connection!');
	socket.emit('doc status', megaDoc);

	socket.on('client change', (value : Descendant[]) => {
		megaDoc = value;
		socket.broadcast.emit('socket change', value);
	});
});

server.listen(PORT, () => {
	console.log(`Started on ${PORT}`);
});