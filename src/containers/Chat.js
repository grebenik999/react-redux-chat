import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import PeopleList from '../components/PeopleList';
import MessageArea from '../components/MessageArea';
import {Link} from 'react-router-dom';
import * as actionCreators from '../store/auth/actions';
import {Layout} from 'antd';
import './styles/chat.css';

const {Content} = Layout;

class Chat extends Component {
  componentWillMount() {
    this.props.getUserList();
  }

  render() {
    //Redirect to chat or Registration/Login form
    if (
      localStorage.getItem('user') !== null ||
      Object.keys(this.props.singleUser).length
    ) {
      return (
        <Content style={{padding: '50px 10px'}}>
          <button className='logout'>
            <Link
              onClick={() => {
                this.props.clearUserData();
              }}
              to='/'
            >
              Log Out
            </Link>
          </button>
          <div className='container clearfix'>
            <PeopleList
              allUsers={this.props.peopleList}
              selectedUser={this.props.userSelect}
            />
            <MessageArea
              chatWith={this.props.chatWith}
              writeMessage={this.props.message}
              postMessageToDB={this.props.postNewMessage}
              getMessages={this.props.getUserMessages}
              allUsers={this.props.peopleList}
            />
          </div>
        </Content>
      );
    } else {
      return <Redirect to='/' />;
    }
  }
}

function mapStateToProps(state) {
  return {
    singleUser: state.user,
    peopleList: state.userList,
    chatWith: state.chatTo,
    message: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
