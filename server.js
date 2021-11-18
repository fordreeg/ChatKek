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
    console.log('socket connected', socket.id)
})

server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен')
})