import {handleActions} from 'redux-actions'
const defaultState={
    timeItem:JSON.parse(sessionStorage.getItem("timeItem"))||['数据获取失败'],
    timeSum:JSON.parse(sessionStorage.getItem("timeSum"))||[1],
}

export default handleActions({
    userlist_action:(state,action)=>{
        console.log(action)
        let newState=Object.assign({},state)
        newState.timeItem=action.payload.timeItem
        newState.timeSum=action.payload.timeSum
        sessionStorage.setItem("timeItem",JSON.stringify(action.payload.timeItem))
        sessionStorage.setItem("timeSum",JSON.stringify(action.payload.timeSum))
        return newState
    }
},defaultState)
