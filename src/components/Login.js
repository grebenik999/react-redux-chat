import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Icon, Input} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class LoginForm extends Component {

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //Checking for the same name in DB
        this.props.form.validateFields((err, values) => {
            if (!err ) {
                console.log('Received values of loginForm: ', values);
                return values;
            }

        });
    };

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('login') && getFieldError('login');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <Form onSubmit={this.handleSubmit}
                      className='logForm'>
                    <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('login', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}
                                name='login'
                                prefix={<Icon type='user'
                                              style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder='Username'/>
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                name='password'
                                prefix={<Icon type='lock'
                                              style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type='password'
                                placeholder='Your password'/>
                        )}
                    </FormItem>
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={hasErrors(getFieldsError())}
                    ><Link to='/chat'>Log In</Link>
                    </Button>
                </Form>

            </div>
        );
    }
}


const Login = Form.create()(LoginForm);

export default Login;
