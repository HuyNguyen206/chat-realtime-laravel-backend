const express = require('express')
const app = express()

const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('connection')
    socket.on('disconnect', () => {
        console.log('disconnection')
    })

    socket.on('newMessage', (payload) => {
        io.emit('newMessage', payload)
    })
})

server.listen(3000, () => {
    console.log('server is listening on port 3000')
})

