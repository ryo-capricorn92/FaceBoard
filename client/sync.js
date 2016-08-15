import io from 'socket.io-client';
import { store } from './index';
import { getAllMessages } from './actions/chat';
import { setReceiverDescription, setCallerDescription } from './actions/webrtc'

let options = {
  'force new connection': true
};

// let socket = io('http://localhost:3000/test', options);
let socket = io('https://face-board-pr-31.herokuapp.com/test', options);

socket.on('userHasJoinedSession', function (mes) {

  phone.ready(function() {
    let secondName = global.localStorage.roomname.split('*')[1];
    let session = phone.dial(secondName);
  });

  phone.receive(function(session) {
    session.connected(function(session) {
      document.getElementById('remoteVideo').appendChild(session.video);
    });
  })
  console.log(mes);
});

socket.on('userHasLeftSession', function (mes) {
  console.log(mes);
});

socket.on('user connected', function (data) {
  console.log(data);
  socket.emit('make sesssion', 'User has connected');
});

socket.on('send message', function (data) {
  store.dispatch(getAllMessages());
});

socket.on('call received', function (data) {
  console.log('this is data call received', data);
  setReceiverDescription(data.description);
})

socket.on('send to caller', function (data) {
  pc1.setRemoteDescription(data.description);
})

export default socket;
