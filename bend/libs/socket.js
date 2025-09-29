const {Server} = require('socket.io')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:'*'
    }
});

const onlineUserScoketMap = {};

const getReceiverSocketId = (userId) =>{
    return onlineUserScoketMap[userId]
}

io.on('connection',socket=>{
    // console.log('a user connected', socket.id)

    const userId = socket.handshake.query.userId;

    if (userId) onlineUserScoketMap[userId]=socket.id;

    console.log(socket.id, userId)

    io.emit('getOnlineUsers', Object.keys(onlineUserScoketMap))

    socket.on('disconnect', ()=>{
        console.log('a user disconnectd', socket.id)
        delete onlineUserScoketMap[userId];
        io.emit('getOnlineUsers', Object.keys(onlineUserScoketMap))
    })
})

module.exports = {io, app, server, getReceiverSocketId}