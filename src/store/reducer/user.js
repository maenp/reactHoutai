import {handleActions} from 'redux-actions'
const defaultState={
    username:sessionStorage.getItem('username')||"未登陆",
    userPic:sessionStorage.getItem('userPic')||""
}


export default handleActions({
    login_action:(state,action)=>{
        console.log(action)
        let newState=Object.assign({},state)
        newState.username=action.payload.username
        newState.userPic=action.payload.userPic
        sessionStorage.setItem('username',action.payload.username)
        sessionStorage.setItem('userPic',action.payload.userPic)
        return newState
    }
},defaultState)