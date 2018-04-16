import {combineReducers} from 'redux';
import {addUsersToDB} from './regReducer';
import {getUserList} from './getUserReducer';
import {messages} from './messgesReducer';
import {chatWithSelectedUser} from './selectUserReducer';

export default combineReducers({
  user: addUsersToDB,
  userList: getUserList,
  messages: messages,
  chatTo: chatWithSelectedUser,
});
