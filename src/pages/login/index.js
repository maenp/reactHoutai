import React, { Component } from 'react'
import { LoginComponent } from './styled'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux'
import { LOGIN } from '@actions'
import { Link } from 'react-router-dom'
const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler(e) {
            e.preventDefault();
            this.props.form.validateFields(async (err, values) => {
                console.log(values.username)
                if (!err) {
                    let code = await dispatch(LOGIN(values))
                    switch (code) {
                        case 1:
                            message.success('欢迎回来', 1, () => {
                                this.props.history.push('/home')
                            })
                            break;
                        case 0:
                            message.error('用户名不存在', .2, () => {
                                this.props.form.resetFields();
                            })
                            break;
                        case 2:
                            message.error('密码错误', .1, () => {
                                this.props.form.resetFields('password');
                            })
                            break;

                        default:
                                message.error('未知错误')
                            break;

                    }
                }
            })
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class Login extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <LoginComponent>
                <div className='login'>
                    <img src='https://www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif' />
                    <Form onSubmit={this.props.loginHandler.bind(this)} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入您的用户名！' },
                                    { min: 3, message: '用户名最小长度为3' },
                                    // { pattern: /^1[357]\d{9}$/, message: "请输入正确的手机号" }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入您的密码！' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住密码</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            <Link to="/register">去注册！</Link>
                        </Form.Item>
                    </Form>
                </div>
            </LoginComponent>
        )
    }
}
export default Login;
