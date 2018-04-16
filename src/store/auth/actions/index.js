import {
  ADD_NEW_USER,
  USER_LIST,
  SEND_MESSAGE,
  GET_MESSAGES,
  SELECT_USER,
  LOGOUT,
} from '../../../constants';
import axios from 'axios';

//POST data to db with redux-thunk
export function setUserInDB(user) {
  return dispatch => {
    return axios
      .post('http://localhost:4000/users', user)
      .then(response => {
        dispatch(addUser(response.data));
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.data.id,
            login: response.data.login,
          })
        );
      })
      .catch(error => {
        console.log('Error from setUser', error);
      });
  };
}

export function addUser(user) {
  return {
    type: ADD_NEW_USER,
    payload: user,
  };
}

//GET USER LIST from DB
export function getUserList() {
  return dispatch => {
    return axios
      .get('http://localhost:4000/users')
      .then(response => {
        let listOfAllUser = response.data;
        let user;
        listOfAllUser.forEach((item, index, array) => {
          user = JSON.parse(localStorage.getItem('user'));
          if (user.id === item.id) {
            array.splice(index, 1);
            dispatch(usersList(listOfAllUser));
          }
        });
      })
      .catch(error => {
        console.log('Error from getUser', error);
      });
  };
}

export function usersList(userList) {
  return {
    type: USER_LIST,
    payload: userList,
  };
}

//Post message to dataBase

export function postNewMessage(data) {
  return dispatch => {
    return axios
      .post('http://localhost:4000/message', {
        activeChatID: data.activeChat,
        fromUser: data.fromUser.login,
        date: data.date,
        msg: data.text,
      })
      .then(response => {
        dispatch(sendMessageAction(response.data));
      })
      .catch(error => {
        console.log('Error from postNewMessage', error);
      });
  };
}

export function sendMessageAction(messages) {
  return {
    type: SEND_MESSAGE,
    payload: messages,
  };
}

//Get messages from DB
export function getUserMessages() {
  return dispatch => {
    return axios
      .get('http://localhost:4000/message')
      .then(response => {
        let messages = response.data;
        dispatch(getMessagesAction(messages));
      })
      .catch(error => {
        console.log('Error from getUserMessages', error);
      });
  };
}

export function getMessagesAction(messages) {
  return {
    type: GET_MESSAGES,
    payload: messages,
  };
}

export function userSelect(id, chatRoom) {
  return {
    type: SELECT_USER,
    payload: {
      userID: id,
      chatID: chatRoom,
    },
  };
}

export function clearUserData() {
  return dispatch => {
    let localUserData = localStorage.removeItem('user');
    dispatch(logout(localUserData));
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}
