import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import renderTabBar from '@utils/renderTabBar.js'
import { layoutRoute } from '@router'
import {withRouter} from 'react-router-dom'
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
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" 
                    // defaultOpenKeys={['/books']}
                    // defaultSelectedKeys={['/books/booksList']}
                    onClick={this.handlerTo.bind(this)}
                    mode="inline">
                        {
                            renderTabBar(layoutRoute)
                        }
                    </Menu>
                </Sider>
                {/* 内容区 */}
                <Layout>
                    <Header style={{ background: '#333', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
    handlerTo({key}){
        this.props.history.push(key)
    }
}
export default LayoutComponent;
