const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    { Server } = require("socket.io"),
    io = new Server(server, {
        cors: {
            origin: '*',
        }
    });
app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms)
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if(!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send(rooms);
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', (data) => {
        socket.join(data.roomId); /*connect to room*/
        rooms.get(data.roomId).get('users').set(socket.id, data.userName); /*added current users to this room*/
        const users = [...rooms.get(data.roomId).get('users').values()]; /*get list all users*/
        socket.broadcast.to(data.roomId).emit('ROOM:JOINED', users) /*sending message all users except myself in this room about connection new users*/
    })
    console.log('user connection', socket.id)
})

server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен')
})