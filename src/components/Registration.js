import React, {Component} from 'react';
import {Form, Button, Icon, Input} from 'antd';

const FormItem = Form.Item;

//inputs errors checking
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            email: null,
            password: null
        };
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    //------------Check two passwords
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('pass')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {

        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;
        const {addNewUser} = this.props;

        // Only show error after a field is touched.
        const loginError = isFieldTouched('newUser') && getFieldError('newUser');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('pass') && getFieldError('pass');
        const confirmPasswordError = isFieldTouched('confirm') && getFieldError('confirm');

        return (
            <div>
                <Form onSubmit={this.handleSubmit}
                      className='regForm'>
                    <FormItem
                        validateStatus={loginError ? 'error' : ''}
                        help={loginError || ''}
                    >
                        {getFieldDecorator('newUser', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}
                                name='login'
                                prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder='Username'
                            />)}
                    </FormItem>

                    <FormItem
                        validateStatus={emailError ? 'error' : ''}
                        help={emailError || ''}
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {required: true, message: 'Please input your E-mail!',}],
                        })(
                            <Input
                                onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}
                                name='email'
                                placeholder='Enter your email'
                                prefix={<Icon type='mail' style={{color: 'rgba(0,0,0,.25)'}}/>}/>)}
                    </FormItem>

                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('pass', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input
                                onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}
                                name='password'
                                prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type='password' placeholder='Password'/>)}
                    </FormItem>
                    <FormItem
                        validateStatus={confirmPasswordError ? 'error' : ''}
                        help={confirmPasswordError || ''}
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input
                                prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type='password'
                                placeholder='Confirm your password'
                                onBlur={this.handleConfirmBlur}
                            />)}
                    </FormItem>
                    <Button
                        className='register'
                        type='primary'
                        htmlType='submit'
                        disabled={hasErrors(getFieldsError())}
                        onClick={() => addNewUser(this.state)}
                    >Sign Up
                    </Button>
                </Form>
            </div>
        );
    }
}


const Registration = Form.create()(RegisterForm);

export default Registration;


