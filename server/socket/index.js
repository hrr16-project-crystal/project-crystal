const io = require('socket.io');
const Messages = require(__dirname + '/../db/index').db.messages;
 

module.exports = (server) => {
  const socketServer = io(server);
  const connections = [];
  // let chatID = 0;
  // on connection client responds with a couple_id which becomes their room
  socketServer.on('connection', socket => {
    socket.on('room', function(room) {
      const coupleRoom = room;
      socket.join(room);
    });
    
    // when 1 couple member is typing, let the other know via typing emit
    socket.on('typing', (id) => {
      socketServer.sockets.in(id).emit('typing', socket.id);
    });

    // if user sends message, add it to the DB and emit new message to couple
    socket.on('action', (action) => {
      if (action.type === 'server/message'){
        Messages.add(action.payload)
          .then(data => {
            socketServer.sockets.in(data.couple_id).emit('message', {type:'message', data: data});
          })
          .catch(err => {
            socketServer.sockets.in(action.payload.couple_id).emit('message', {type:'error', data: err});
          });
      }
    });

    socket.on('disconnect', () => {
    });
  });
}