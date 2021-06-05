import app = require('./lib/app');
import http = require('http');
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 7890;

io.on('connection', socket => {
	socket.on('chat message', msg => {
		io.emit('chat message', msg);
	});
});

server.listen(PORT, () => {
	console.log(`Started on ${PORT}`);
});