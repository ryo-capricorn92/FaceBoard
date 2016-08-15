import axios from 'axios';
import socket from '../sync';

export function sessionChange (field, value) {
  return {
    type: 'CHANGE_FIELD',
    field,
    value
  };
}

export function makeSession (sessionName) {
  console.log('here');
  return axios.post('https://face-board.herokuapp.com/session/start', {
    sessionName: sessionName
  })
  .then((response) => {
    global.localStorage.session = response.data.id;
  });
}

// add route for searching for user by username to grab invite user id
export function inviteToSession (sessionId, invitedUserId) {
  return axios.post('https://face-board.herokuapp.com/' + invitedUserId, {
    id: sessionId,
    secondId: invitedUserId
  })
  .then(function (session) {
    console.log(session);
  });
}

export function makePrivateSession (firstUserName, secondUserName) {
  var userObj = {
    firstUserName: firstUserName,
    secondUserName: secondUserName
  };
  socket.emit('privateSessionCreation', userObj);
  global.localStorage.roomname = firstUserName + '*' + secondUserName;
}

export function confirmJoinSession (firstUsername) {
  return confirm(firstUsername + 'wants to create a private session with you. Would you like to join?');
}

export function setSessionGlobals (firstUser, secondUser, data) {
  global.localStorage.roomname = firstUser + '*' + secondUser;
  global.localStorage.inSession = true;
  socket.emit('userWantsToJoinSession', data);
}

export function isSecondUser (secondUser) {
  return global.localStorage.username === secondUser && !global.localStorage.inSession;
}