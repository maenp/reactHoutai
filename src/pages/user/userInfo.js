import React, { Component } from 'react'
import { Avatar, PageHeader, Button, Modal, Row, message, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { UserInfoSty } from './styled'
import UploadImage from '@components/uploadimage'
import { UPDATAIMAGE, AMENDINFO } from '@actions'

const mapStateToProps = (state) => {
    return {
        prop: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        async uploadImage() {
            let userId = this.props.prop.userId
            let userPic = this.file.originFileObj
            let formData = new FormData();
            formData.append("userId", userId);
            formData.append("userPic", userPic);
            let code = await dispatch(UPDATAIMAGE(formData))
            console.log(code)
            if (code === 200) {
                message.success('头像修改成功', .3, () => {
                    this.setState({ visible: false })
                    this._this.setState({newImageUrl:false})//通知子组件图片已修改成功 回到以前的状态
                    this.setState({type:false})//通知自己图片已修改成功 回到以前的状态
                })
            }
        },
        amendInfoHandler(e) {
            e.preventDefault();
            let userId = this.props.prop.userId
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    let { password, username } = values
                    let code = await dispatch(AMENDINFO({ userId, password, username }))
                    if (code) {
                        message.success('资料修改成功', .3, () => {
                            this.setState({ visible_A: false })
                        })
                    }
                }
            });
        }
    }
}
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            visible_A: false,
            type: false
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { username, userPic, userId } = this.props.prop
        let { type } = this.state
        return (
            <UserInfoSty>
                <PageHeader title='个人资料' />
                <div className='info'>
                    <div className='left'>
                        <div className='avater'>
                            <Avatar src={userPic} size={128} icon="user" />
                        </div>
                        <Button type='link'
                            onClick={this.modalOffHandlet.bind(this)}
                            style={{
                                paddingLeft: '32px',
                                paddingTop: '12px',
                            }}>修改头像</Button>
                    </div>
                    <div className="right">
                        <div className='right_top'>
                            <span>用户名：{username}</span><br />
                            <span>关注 1 &nbsp;&nbsp;&nbsp;</span>
                            <span>粉丝 1&nbsp;&nbsp;&nbsp;</span>
                            <span>|&nbsp;&nbsp;&nbsp;</span>
                            <span>余额 0&nbsp;&nbsp;&nbsp;</span>
                            <a>充值</a>
                        </div>
                        <div className='right_bottom'>
                            <Button type='link'
                                onClick={() => { this.setState({ visible_A: true }) }}
                                style={{
                                    float: 'right'
                                }}>修改资料</Button>
                            <p>用户ID：{userId}</p>
                            <p>实名：</p>
                            <p>性别：男</p>
                            <p>生日：</p>
                            <p>地区：</p>
                            <p>行业：</p>
                            <p>职位：</p>
                            <p>简介：</p>
                        </div>
                    </div>
                </div>
                <Modal
                    title="上传头像"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => { this.setState({ visible: false }) }}>
                    <Row>
                        <UploadImage
                            type='headImage'
                            onChange={file => { this.file = file }}
                            callback={this.callbackHandler.bind(this)}
                            value={userPic} />
                    </Row>
                    <Row style={{
                        textAlign: 'right'
                    }}>
                        {
                            type ?
                            <Button style={{ display: 'inline-block', marginTop: '30px' }}
                                onClick={this.props.uploadImage.bind(this)}
                                type="danger"
                            >修改</Button>:
                            <Button style={{ display: 'inline-block', marginTop: '30px' }}
                                    onClick={() => { this.setState({ visible: false }) }}
                                    type="primary"
                            >取消</Button>
                        }
                    </Row>

                </Modal>
                <Modal
                    title="修改资料"
                    visible={this.state.visible_A}
                    footer={null}
                    onCancel={() => { this.setState({ visible_A: false }) }}>
                    <Form onSubmit={this.props.amendInfoHandler.bind(this)}>
                        <Form.Item label="要修改的用户名">
                            {
                                getFieldDecorator('username', {
                                })(
                                    <Input type='text' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="要修改的密码">
                            {
                                getFieldDecorator('password', {
                                })(
                                    <Input type='password' />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>修改</Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </UserInfoSty>
        )
    }
    modalOffHandlet() {
        this.setState({
            visible: true
        })
    }
    callbackHandler(_this) {
        this._this=_this
        this.setState({type:true})
    }

}
export default UserInfo