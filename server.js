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

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms)
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