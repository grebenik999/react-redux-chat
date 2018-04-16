import React, {Component} from 'react';

class ChatHeader extends Component {

    render() {

        //get user id and isSelected: true
        const writeMessageTo = this.props.writeMessageTo;

        //get user login from userList for our header
        const writeMessageToUser = this.props.chooseLogin;

        let topUserLogin = writeMessageToUser.map(function (user) {
            return ((writeMessageTo.userID === user.id) ? <div key={user.id}>
                <div className='avatar-msg'>
                    <img src='https://o-viber.ru/wp-content/uploads/2017/08/mujskie_avatarki-5.png'
                         alt='avatar'/>
                </div>

                <div className='chat-about'>

                    <div className='chat-with'>{`Chat with ${user.login}`}</div>
                    <div className='chat-num-messages'>already 1 902 messages</div>
                </div>
                <i className='fa fa-star'/>
            </div> : null)
        });


        return (
            <div className='chat-header clearfix'>
                {(writeMessageTo.userID === undefined) ? <h2>Select the User with you want to chat</h2> : topUserLogin}
            </div>
        )
    }
}

export default ChatHeader;
