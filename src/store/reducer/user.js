import {handleActions} from 'redux-actions'
const defaultState={
    username:sessionStorage.getItem('username')||"未登陆",
    userPic:sessionStorage.getItem('userPic')||"--",
    userId:sessionStorage.getItem('userId')||"--"
}


export default handleActions({
    login_action:(state,action)=>{
        console.log(action)
        let newState=Object.assign({},state)
        newState.username=action.payload.info.username
        newState.userPic=action.payload.info.userPic
        newState.userId=action.payload.userId
        sessionStorage.setItem('username',action.payload.info.username)
        sessionStorage.setItem('userPic',action.payload.info.userPic)
        sessionStorage.setItem('userId',action.payload.userId)
        return newState
    },
    updataImage_action:(state,action)=>{
        console.log(action,'修改图片')
        let newState=Object.assign({},state)
        newState.userPic=action.payload
        sessionStorage.setItem('userPic',action.payload)
        return newState
    },
    anendInfo_action:(state,action)=>{
        console.log(action)
        let newState=Object.assign({},state)
        newState.username=action.payload
        sessionStorage.setItem('username',action.payload)
        console.log(newState)
        return newState
    },
},defaultState)