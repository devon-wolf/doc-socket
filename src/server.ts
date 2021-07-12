import server from './socket';

const PORT = process.env.PORT || 7890;

server.listen(PORT, () => {
	console.log(`Started on ${PORT}`);
});