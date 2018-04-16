import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {indexStore} from './store/index';
import 'antd/dist/antd.css';
import App from './containers/App';
import Chat from './containers/Chat';

//------------------------------

const store = indexStore;

//-----------------------------

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/chat' component={Chat}/>
            </Switch>
        </Router>
    </Provider>, document.getElementById('root'));
