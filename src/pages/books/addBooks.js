import React, { Component ,Fragment} from 'react'
import wangEditor from 'wangeditor'
import {Button} from 'antd'
export default class AddBooks extends Component {
    render() {
        return (
            <Fragment>
                <div ref='editor'/>
                <Button style={{marginTop:'20px'}}>提交</Button>
            </Fragment>
        )
    }
    componentDidMount(){
        new wangEditor(this.refs.editor).create()
    }
}
