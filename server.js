const express = require('express');
const http = require("http");
const socket = require("socket.io");
const formatMessage = require('./utils/message');
const {userJoin, getCurrentUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);

const chatName ='Bot';

const PORT = 5000;

server.listen( PORT, ()=> console.log(`Listening on port ${PORT}`));

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

//Run when client connects
io.on("connection", function (socket){
    console.log("Made socket connection")
    

    // Broadcast when a user connects
    socket.on('user-join', (username)=>{
        const user = userJoin(socket.id, username);
        socket.broadcast.emit('message', formatMessage(chatName, 'A user has joined the chat'));
        io.emit('Users', users); 
    })
    

    //Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage('USER',msg))
    })

    //Runs when disconnets
    socket.on('disconnect', ()=>{
        io.emit('message',formatMessage(chatName,'A user has left the chat'));
    })

});
    


    
