const express = require('express');
const app = express();

const port = process.env.PORT || 3700;

app.use(express.static(__dirname + '/template'));

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
  socket.emit('message', { message: 'Welcome to the chat'});
  socket.on('send', (data) => {
    io.sockets.emit('message', data);
  })
})