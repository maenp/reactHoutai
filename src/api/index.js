import {get,post} from '@utils/http'

export const loginApi=(values)=>post("/api/users/login",{userId:values.username,password:values.password})