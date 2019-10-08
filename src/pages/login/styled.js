import styled from 'styled-components'
import bg from '@/static/img/bg.jpg'
export const LoginComponent = styled.div`
    height: 100%;
    width:100%;
    background:url(${bg}) no-repeat;
    background-size:cover;
    .login{
        height: 320px;
        width:500px;
        border-radius:10px;
        background:rgba(255,255,255,.7);
        position: absolute;
        padding:50px;
        padding-top:10px;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -250px;
        img{
            height: 50px;
            display:block;
            margin:0 auto;
        }
        .login-form {
        max-width: 400px;
        }
        .login-form-forgot {
        float: right;
        }
        .login-form-button {
        width: 100%;
        }
    }
`