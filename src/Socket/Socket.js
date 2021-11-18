import io from 'socket.io-client';

const Socket = () => io('http://localhost:8888')

export default Socket;