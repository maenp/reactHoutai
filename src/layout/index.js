import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import renderTabBar from '@utils/renderTabBar.js'
import { layoutRoute } from '@router'
import { withRouter } from 'react-router-dom'
import DropDown from '@common/dropdown'
const { Header, Content, Footer, Sider } = Layout;

@withRouter
class LayoutComponent extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        let BreadArr = this.props.location.pathname.split('/')
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark"
                        defaultOpenKeys={['/books']}
                        defaultSelectedKeys={['/home']}
                        onClick={this.handlerTo.bind(this)}
                        mode="inline">
                        {
                            renderTabBar(layoutRoute)
                        }
                    </Menu>
                </Sider>
                {/* 内容区 */}
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <DropDown />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                BreadArr.map(t => (
                                    <Breadcrumb.Item key={t}>{t}</Breadcrumb.Item>
                                ))
                            }
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
    handlerTo({ key }) {
        this.props.history.push(key)
    }
}
export default LayoutComponent;
