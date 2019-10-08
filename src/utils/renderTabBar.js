import React, { Component } from 'react'
import { Menu,Icon } from 'antd';
const { SubMenu } = Menu;
export default (routes) => {
    function eashTabBar(route) {
        return <SubMenu
            key={route.key}
            title={
                <span>
                    <Icon type={route.icon} />
                    <span>{route.name}</span>
                </span>
            }>
            {
                route.children.map(child => {
                    return <Menu.Item
                        key={child.key}>
                        {child.name}
                    </Menu.Item>
                })
            }
        </SubMenu>
    }
    return routes.map(route => {
        if (route.children) {
            return eashTabBar(route)
        } else {
            return <Menu.Item key={route.key}>
                <Icon type={route.icon} />
                <span>{route.name}</span>
            </Menu.Item>
        }
    })
}