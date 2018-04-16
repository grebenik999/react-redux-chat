import React, {Component} from 'react';
import {Spin} from 'antd';



class PeopleList extends Component {

    handleSelect = (e) => {
        const dataID = +e.currentTarget.dataset.id;
        const chatRoomID = dataID;
        this.props.selectedUser(dataID, chatRoomID);
    };

    render() {
        const allUsers = this.props.allUsers;

        return (
            <div className='people-list' id='people-list'>
                <ul className='list'>
                    {allUsers.length === 0
                        ? <Spin size='large'/>
                        : allUsers.map(user => {
                        return (
                            <li data-id={user.id}
                                key={user.id}
                                onClick={this.handleSelect}>
                                <div className='avatar'>
                                    <img src='https://o-viber.ru/wp-content/uploads/2017/08/mujskie_avatarki-5.png'
                                         alt='avatar'/>
                                </div>

                                <div className='about'>
                                    <div className='name'>{user.login}</div>
                                    <div className='status'>
                                        <i className='fa fa-circle online'/> online
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    }

                </ul>
            </div>
        )

    }

}

export default PeopleList;
