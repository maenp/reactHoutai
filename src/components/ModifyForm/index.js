import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from "antd"
import UpLoadImage from '@components/uploadimage'

@Form.create()
class ModifyForm extends Component {
    constructor() {
        super()
        this.state = {
            plainOptions: ["悬疑", "灵异奇谈", "阴间系列", "程序员", "民俗奇谈", "鬼怪",
                "仙侠", "脑洞", "奇遇"]
        }
    }
    render() {
        let { authorIcon, authorName, name, icon, bookTags } = this.props.ModifyData;
        const { getFieldDecorator } = this.props.form;
        let { plainOptions } = this.state
        return (
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onSubmit={this.handleSubmit.bind(this)}
            >
                <Form.Item label="作者头像">
                    {
                        getFieldDecorator('authorIcon', {
                            initialValue: authorIcon,//定义表单初始值
                        })(
                            <UpLoadImage />
                        )
                    }
                </Form.Item>
                <Form.Item label="作者笔名">
                    {
                        getFieldDecorator('authorName', {
                            initialValue: authorName,//定义表单初始值
                        })(
                            <Input type='text' />
                        )
                    }
                </Form.Item>
                <Form.Item label="书籍名称">
                    {
                        getFieldDecorator('name', {
                            initialValue: name,//定义表单初始值
                        })(
                            <Input type='text' />
                        )
                    }
                </Form.Item>
                <Form.Item label="书籍封面">
                    {
                        getFieldDecorator('icon', {
                            initialValue: icon,//定义表单初始值
                        })(
                            <UpLoadImage />
                        )
                    }
                </Form.Item>
                <Form.Item label="分类">
                    {
                        getFieldDecorator('bookTags', {
                            initialValue: bookTags,//定义表单初始值
                        })(
                            <Checkbox.Group
                                options={plainOptions}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>修改</Button>
                </Form.Item>
            </Form>
        )
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('发送AJAX即可: ', values);
                //ajax提交修改的数据
            }
        });
    }
}
export default ModifyForm