import {createAction} from 'redux-actions'
import moment from 'moment'
import {loginApi,registerApi,updataImageApi,amendInfoApi,UserListApi} from "@api"
const LOGIN_AITION=createAction('login_action',info=>info)
export const LOGIN=(values)=>{
    return async (dispatch)=>{
        let data=await loginApi(values)
        console.log(data)
        if(data.data.code===1){
            dispatch(LOGIN_AITION({info:data.data.info,userId:values.username}))
        }
        return data.data.code
    }
}
const REGHITER_AITION=createAction('register_action',info=>info)
export const REGHITER=(values)=>{
    return async (dispatch)=>{
        let data=await registerApi(values)
        console.log(data)
        // dispatch(REGHITER_AITION(data.data.info))
        return data.data.code
            
        
    }
}
//上传图片
const UPDATAIMAGE_AITION=createAction('updataImage_action',urlPic=>urlPic)
export const UPDATAIMAGE=(formData)=>{
    return async (dispatch)=>{
        let data=await updataImageApi(formData)
        console.log(data,'成功')
        dispatch(UPDATAIMAGE_AITION(data.data.urlPic))
        return data.code
            
        
    }
}
//修改个人信息
const AMENDINFO_AITION=createAction('anendInfo_action',username=>username)
export const AMENDINFO=(info)=>{
    return async (dispatch)=>{
        let {userId,password,username}=info
        console.log(info)
        if(password)amendInfoApi(userId,password,username)
        if(username) {
            password=''
            var data=await amendInfoApi(userId,password,username)
            console.log(data)
            dispatch(AMENDINFO_AITION(data.data.info.username))
            return data.data.info.username
        }
    }
}

//首页获取用户数据
const USERLIST_ACTION=createAction('userlist_action',time=>time)
export const USERLIST=()=>{
    return async (dispatch)=>{
        let data=await UserListApi()
        let timeList=data.data.list.map(t=>moment(t.registerTime).format('MM-DD'))
        let timeItem=[...new Set(timeList)]
        let timeSum=[]
        timeItem.forEach(L=>{
            let i=0;
            for(let n=0;n<=timeList.length;n++){
                if(L==timeList[n]){
                    i++
                }else{
                    timeList.splice(0,i)
                    timeSum.push(i)
                    break;
                }
            }  
        })
        timeItem=timeItem.slice(-10)
        timeSum=timeSum.slice(-10)
        dispatch(USERLIST_ACTION({timeItem,timeSum}))

    }
}