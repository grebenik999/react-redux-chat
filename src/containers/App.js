import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../store/auth/actions';
import Registration from '../components/Registration';
import Login from '../components/Login';
import {Row, Col} from 'antd';
import './styles/App.css';


class App extends Component {

    render() {

        //Redirect to chat or Registration/Login form
        if (Object.keys(this.props.users).length) {
            return (
                <Redirect to='/chat'/>
            )
        } else {
            return (
                <div className='App'>
                    <Row>
                        <Col span={6} offset={3}>
                            <div className='reg'>
                                <h2>Sign Up</h2>
                                <Registration
                                    addNewUser={this.props.setUserInDB}
                                />
                            </div>
                        </Col>
                        <Col span={6} offset={3}>
                            <div className='log'>
                                <h2>Log In</h2>
                                <Login/>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }

    }

}

function mapStateToProps(state) {
    return {
        users: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
