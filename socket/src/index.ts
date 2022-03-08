import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})

httpServer.listen(8900, () => {
  console.log('started')
})

interface IUsers {
  userId: number
  socketId: string | string[]
}

let users:IUsers[] = []

const addUser = (userId:number, socketId:string) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: number) => {
  return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  //when connect
  console.log('a user connected.')

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
  })

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      })
    }
  })

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})
