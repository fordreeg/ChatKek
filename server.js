const express = require('express'),
    app = express(),
    useSocket = require('socket.io'),
    server = require('http').Server(app),
    io = useSocket(server);

const rooms = new Map([

]);

app.get('/rooms', (request, res) => {
    res.json(rooms)
});

io.on('connection', socket => {
    console.log('socket connected', socket)
})

server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен')
})