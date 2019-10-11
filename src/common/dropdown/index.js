import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Row, Col, message } from 'antd';
import { withRouter } from 'react-router-dom'
import Cookie from 'js-cookie'

@withRouter
class DropDown extends Component {
    constructor() {
        super()
        this.menu = (
            <Menu onClick={this.MenuClickHandle.bind(this)}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    账号设置
                    </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="frown" />
                    意见反馈
                    </Menu.Item>
                <Menu.Item key="signout">
                    <Icon type="user-delete" />
                    退出登录
                    </Menu.Item>
            </Menu>
        );
    }
    render() {
        return (
            <Row>
                <Col offset={21} span={3}>
                    <Dropdown overlay={this.menu}>
                        <a className="ant-dropdown-link"
                            span={3}
                            style={{color:"#fff"}}
                            href="#">
                            个人中心 <Icon type="down" />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        )
    }
    MenuClickHandle({ key }) {
        console.log(this)
        if (key === 'signout') {
            console.log(Cookie)
            Cookie.remove('token')
            message.success('您已退出登录，再见', 1, () => {

                this.props.history.push('/home')
            })
        }
    }
}
export default DropDown