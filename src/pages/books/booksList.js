import React, { Component, Fragment } from 'react'
import { Table, Divider, Tag, Button, Modal, Form, Select } from 'antd';
import { booksListApi } from '@api'
import ModifyForm from '@components/ModifyForm'
const { Option } = Select
const booksInfo = {
    page: 1,
    pageSize: 10,
    free: 0,
    group: 1,
    finish: 0,
    sortId: ""
}
export default class BooksList extends Component {
    constructor() {
        super()
        this.state = {
            booksList: [],
            visible: false,
            ModifyData: "",
            columns: [
                {
                    title: '作者头像',
                    dataIndex: 'authorIcon',
                    key: 'authorIcon',
                    render: url => <img src={url} style={{ width: '30px', height: '30px' }} />,
                },
                {
                    title: '作者笔名',
                    dataIndex: 'authorName',
                    key: 'authorName',
                },
                {
                    title: '书籍名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: "书籍封面",
                    dataIndex: "icon",
                    key: "icon",
                    render: url => <img src={url} style={{ width: '50px', height: '70px' }} />
                },
                {
                    title: 'Tags',
                    key: 'bookTags',
                    dataIndex: 'bookTags',
                    render: tags => (
                        <span>
                            {tags.map(tag => {
                                return (
                                    <Tag color='volcano' key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </span>
                    ),
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type='link'
                                size='small'
                                style={{ padding: 0 }}
                                onClick={this.amendHandler.bind(this, record)}>操作</Button>
                            <Button type='link'
                                size='small'
                                onClick={this.delListHandler.bind(this, record)}>删除</Button>
                        </span>
                    ),
                },
            ]
        }
    }
    render() {
        let { booksList, columns, ModifyData, visible } = this.state

        return (
            <Fragment>
                <Form layout='inline'>
                    <Form.Item label='价格'>
                        <Select defaultValue='全部' onChange={this.selectHandler.bind(this,1)}>
                            <Option value='0'>全部</Option>
                            <Option value='1'>收费</Option>
                            <Option value='2'>免费</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='频道'>
                        <Select defaultValue='男频' onChange={this.selectHandler.bind(this,2)}>
                            <Option value='0'>男频</Option>
                            <Option value='1'>女频</Option>
                            <Option value='2'>出版</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='状态'>
                        <Select defaultValue='全部&nbsp;' onChange={this.selectHandler.bind(this,3)}>
                            <Option value='0'>全部</Option>
                            <Option value='1'>完结</Option>
                            <Option value='2'>连载</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='分类'>
                        <Select defaultValue='全部&nbsp;' style={{width:'80px'}} onChange={this.selectHandler.bind(this,4)}>
                            <Option value="">全部</Option>
                            <Option value="1000010">现代都市</Option>
                            <Option value="1000012">仙侠武侠</Option>
                            <Option value="1000011">奇幻修真</Option>
                            <Option value="1000013">科幻游戏</Option>
                            <Option value="1000014">悬疑推理</Option>
                            <Option value="1000015">军事战争</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Table
                    rowKey={record => record.id}
                    columns={columns}//定义表格顶部行信息及配置
                    dataSource={booksList} //定义数据行，数据属性要与columns属性值对应
                    pagination={{
                        total: 1001,
                        showQuickJumper: true,
                        onChange: this.pageHandler.bind(this),
                        pageSize: 10
                    }}
                />

                <Modal
                    title="修改书籍信息"
                    visible={visible}
                    footer={null}
                    onCancel={() => { //点击遮罩层或右上角叉关闭遮罩
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    {
                        visible ? <ModifyForm ModifyData={ModifyData} /> : ""
                    }
                </Modal>
            </Fragment>
        )
    }
    delListHandler({ authorName }) {
        console.log(authorName)
        Modal.confirm({
            title: '删除',
            content: `您确定要删除《${authorName}》这本书吗？`,
            okText: "确定",
            cancelText: '取消',
            onOk: () => {
                //点击确定后的回调，这里做ajax交互
            },
            maskClosable: true
        })
    }
    amendHandler(ModifyData) {
        // this.ModifyData=this.state.ModifyData
        this.setState({
            ModifyData,
            visible: true
        })
    }
    componentDidMount() {
        this.getBooksList()
    }
    async getBooksList() {
        let { page, pageSize, free, group, finish, sortId } = booksInfo
        let data = await booksListApi(page, pageSize, free, group, finish, sortId)
        let booksList = data.data.bookList
        this.setState({
            booksList
        })
    }
    pageHandler(page) {
        booksInfo.page = page
        this.getBooksList()
    }
    selectHandler(num,value){
        switch (num) {
            case 1:
                booksInfo.free = value
                break;
            case 2:
                booksInfo.group = value
                break;
            case 3:
                booksInfo.finish = value
                break;
            case 4:
                booksInfo.sortId = value
                break;
            default:
                break;
        }
        this.getBooksList()
    }
}
