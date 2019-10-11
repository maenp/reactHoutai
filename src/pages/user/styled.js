import styled from 'styled-components'
export const UserInfoSty = styled.div`
width:800px;
.info{
border-top:1px solid #e0e0e0;
display:flex;
padding-top:30px;
}
.left{
float:left;
width:170px;
    .avater{
        border:1px dashed #999;
        overflow:hidden;
        height: 130px;
        width:130px;
        border-radius:50%;
    }
}
.right{
    padding-left:20px;
    float:left;
    width:100%;
    height: 1000px;
    .right_top{
        height: 130px;
        width:100%;
        border-bottom:1px solid #e0e0e0;
        margin-bottom:20px;
        span:nth-of-type(1){
            color:#999;
        }
        span:nth-of-type(4){
            color:#999;
            font-size:19px;
        }
        span{
            display: inline-block;
            font-size:16px;
            margin-bottom:10px;
        }
    }

}
.ant-upload-picture-card-wrapper,.ant-modal-body{
    height: 300px !important;
}
`