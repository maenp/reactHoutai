import React, { Component } from 'react'
import { UserListApi } from '@api'
import { Table,Switch } from 'antd';
import moment from 'moment'
const booksInfo = {
    page: 1,
    pageSize: 10,
    free: 0,
    group: 1,
    finish: 0,
    sortId: ""
}
export default class UserList extends Component {
    constructor() {
        super()
        this.columns=[
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '账号',
                dataIndex: 'userId',
            },
            {
                title: '用户头像',
                dataIndex: 'userPic',
                render: url => <img src={url} style={{ width: 'auto', height: '50px' }} />
            },
            {
                title: "注册时间",
                dataIndex: "registerTime",
                render:time=>moment(time).format('YYYY-MM-DD')
            },
            {
                title: '冻结账号',
                render: (text, record) => (
                    <Switch defaultChecked={false}
                        checkedChildren="已冻结"
                        unCheckedChildren="未冻结"
                        onChange={this.UserChangeHandler.bind(this, record._id)} />
                ),
            },
        ]
        this.state = {
            usersList: [],
            usersListLength: '',
        }
    }
    render() {
        let { usersList,usersListLength } = this.state
        return (
            <Table
                rowKey={record => record._id}
                columns={this.columns}//定义表格顶部行信息及配置
                dataSource={usersList} //定义数据行，数据属性要与columns属性值对应
                pagination={{
                    total: usersListLength,
                    showQuickJumper: true,
                    // onChange: this.pageHandler.bind(this),
                    pageSize: 10
                }}
            />
        )
    }
    componentDidMount() {
        this.pageHandler()
    }
    async pageHandler(page) {
        let data = await UserListApi()
        this.setState({
            usersList: data.data.list,
            usersListLength: data.data.list.length
        })
    }
    UserChangeHandler(id, bool) {
        //进行AJAX数据交互
        console.log('ID为 ' + id + ' 的账户 ' + (bool ? '已冻结' : '已解除冻结'))
    }
}
