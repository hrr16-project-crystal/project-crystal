import * as actions from './messageActions';
import io from 'socket.io-client';
 
var socket = null;
 
export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
 
    if (socket && action.type === actions.ADD_MESSAGE) {
      let messages = store.getState().messages;
      socket.emit('message', messages[messages.length -1]);
    }
 
    return result;
  };
}
 
export default function (store) {
  const socket = io.connect(`${location.protocol}//${location.host}`);
 
  socket.on('message', message => {
    store.dispatch(actions.addResponse(message));
  });
}