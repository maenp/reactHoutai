import React, { Component } from 'react'
import { Upload} from 'antd';


export default class UpLoadImage extends Component {
    handleChange = info => { //info.file是该图片的file类型文件
        this.props.onChange(info.file)//直接改变表单内容
    };
    render() {
        const imageUrl= this.props.value;
        return (
            <Upload
                name="avatar"
                listType="picture-card"//上传类型是图片类型
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
            >
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            </Upload>
        )
    }
}
