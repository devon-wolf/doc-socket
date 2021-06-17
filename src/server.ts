import app = require('./lib/app');
import http = require('http');
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"],
	  allowedHeaders: ["document-events"],
	  credentials: true
	}
  });

const PORT = process.env.PORT || 7890;

io.on('connection', socket => {
	console.log('a connection!');

	socket.on('chat message', msg => {
		io.emit('chat message', msg);
	});
	
	socket.on('outgoing change', value => {
		socket.broadcast.emit('incoming change', value);
	});
});

server.listen(PORT, () => {
	console.log(`Started on ${PORT}`);
});