const express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  {Server} = require('socket.io'),
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  })
app.use(express.json())

const rooms = new Map()

app.get('/rooms/:id', (req, res) => {
  const {id: roomId} = req.params
  const obj = rooms.has(roomId)
    ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
    : {users: [], messages: []}
  res.json(obj)
})

app.post('/rooms', (req, res) => {
  const {roomId} = req.body
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    )
  }
  res.send(rooms)
})

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', (data) => {
    socket.join(data.roomId) /*connect to room*/
    rooms
      .get(data.roomId)
      .get('users')
      .set(socket.id, data.userName) /*added current users to this room*/
    const users = [
      ...rooms.get(data.roomId).get('users').values(),
    ] /*get list all users*/
    socket.broadcast
      .to(data.roomId)
      .emit(
        'ROOM:SET_USERS',
        users
      ) /*sending message all users except myself in this room about connection new users*/
  })
  
  socket.on('ROOM:NEW_MESSAGE', ({userName, roomId, text}) => {
    const obj = {
      userName,
      text,
    }
    rooms.get(roomId).get('messages').push(obj)
    socket.broadcast
      .to(roomId)
      .emit(
        'ROOM:NEW_MESSAGE',
        obj
      ) /*sending message all users except myself in this room about connection new users*/
  })
  
  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]
        socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users)
      }
    })
  })
})

server.listen(8888, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Сервер запущен')
})
