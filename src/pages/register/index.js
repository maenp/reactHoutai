import React, { Component } from 'react'
import { LoginComponent } from './styled'
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { REGHITER } from '@actions'
import { Link } from 'react-router-dom'
const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler(e) {
            e.preventDefault();
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let code = await dispatch(REGHITER(values))
                    switch (code) {
                        case 1:
                            message.success('注册成功', 1, () => {
                                this.props.history.push('/login')
                            })
                            break;
                        case 2:
                            message.error('用户名已存在', .3, () => {
                                this.props.form.resetFields();
                            })
                            break;
                        default:
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
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                            <Link to="/login">去登录！</Link>
                        </Form.Item>
                    </Form>
                </div>
            </LoginComponent>
        )
    }
}
export default Login;
