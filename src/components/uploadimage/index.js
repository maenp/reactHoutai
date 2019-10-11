import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) { //将file文件转getBase64图片
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) { //限值图片的类型和大小
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) { //限值文件格式
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) { //限值图片大小
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class UpLoadImage extends Component {
    state = {
        loading: false,
    };
    //handleChange函数会执行两次   第一次uploading  第二次 done
    handleChange = info => { //info.file是该图片的file类型文件
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, newImageUrl =>{
                this.props.callback(this)//通知父组件，新图片已准备完毕
                this.setState({
                    newImageUrl,
                    loading: false,
                })
            }
                
            );
        }
        this.props.onChange(info.file)//直接改变表单内容
    };
    render() {
        const imageUrl = this.props.value;
        const { type } = this.props;
        const uploadButton = (
            <div style={{ position: 'relative' }}>
                <Icon type={this.state.loading ? 'loading' : 'plus'} style={{ position: 'absolute', top: '43%', left: '43%' }} />
                {
                    type === 'headImage' ? <div className="ant-upload-text" style={{
                        height: '300px', width: '455px'
                    }}
                    ></div> : <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                }

            </div>
        );
        const { newImageUrl } = this.state;
        return (
            <div style={type==='headImage'?{
                height: '300px', width: '455px'
            }:{}}>
                <Upload
                    name="avatar"
                    listType="picture-card"//上传类型是图片类型
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                    beforeUpload={beforeUpload}>
                    {newImageUrl ?<img src={newImageUrl} alt="avatar" style={{ width: '100%' }} />: uploadButton}        
                </Upload>
                {newImageUrl ?<p style={{margin:'5px 0 0 24px'}}>效果预览</p>:''}
            </div>
        )
    }
}
