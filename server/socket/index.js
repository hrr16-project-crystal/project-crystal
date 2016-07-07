'use strict';
const io = require('socket.io');
const Messages = require(__dirname + '/../db/index').db.messages;
const Couples = require(__dirname + '/../db/index').db.couples;
const brain = require('../helpers/brain');


module.exports = (server) => {
  const socketServer = io(server);
  const clients = {};

  // on connection client responds with a couple_id which becomes their room
  socketServer.on('connection', socket => {
    clients[socket.id] = socket;

    // These socket actions are caught and sent via redux-socket.io middleware on the client
      // Any dispatch of type 'server/foo' is emitted 
    socket.on('action', (action) => {
      // if user sends message, add it to the DB and emit new message to couple
      if (action.type === 'server/message'){
        Messages.add(action.data)
          .then(data => {
            let messageTone = (brain(data.content));
            if (messageTone === 'good') {
              Couples.updateScore(.1, data.couple_id)
              .then(changed => {
                  socketServer.sockets.in(data.couple_id).emit('action', { type: 'FETCH_HEALTH', payload: { data: changed } });
              });
            } else {
              Couples.updateScore(-.1, data.couple_id)
              .then(changed => {
                  socketServer.sockets.in(data.couple_id).emit('action', { type: 'FETCH_HEALTH', payload: { data: changed } });
              });
            }
            socketServer.sockets.in(data.couple_id).emit('action', { type: 'ADD_MESSAGE', data: data });
          })
          .catch(err => {
            socketServer.sockets.in(action.payload.couple_id).emit('message', { type: 'error', data: err });
          });
      // if user is typing, send signal to their partner
      } else if (action.type === 'server/typing') {
        socket.broadcast.to(action.data.couple).emit('action', { type: 'IS_TYPING', data: action.data.name });
      // add couple to rooms by their couple id
      } else if (action.type === 'server/room') {
        socket.join(action.data);
        socket.emit('action', { type: 'JOINED_ROOM', data: true });
      }
    });

    socket.on('disconnect', () => {
      socket.emit('action', { type: 'JOINED_ROOM', data: false });
      delete clients[socket.id];
    });
  });
}
