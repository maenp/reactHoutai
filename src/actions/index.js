import {createAction} from 'redux-actions'
import {loginApi} from "@api"
const LOGIN_AITION=createAction('login_action',info=>info)
export const LOGIN=(values)=>{
    return async (dispatch)=>{
        let data=await loginApi(values)
        console.log(data)
        dispatch(LOGIN_AITION(data.data.info))
        if(data.data.code){
            return true
        }
    }
}