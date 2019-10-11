import {get,post,postimg} from '@utils/http'
export const loginApi=(values)=>post("/api/users/login",{userId:values.username,password:values.password})
export const registerApi=(values)=>post("/api/users/register",{userId:values.username,password:values.password})

export const booksListApi=(page,pageSize,free,group,finish,sortId)=>post("/api/books/booksList",{page,pageSize,free,group,finish,sortId})
//获取用户列表
export const UserListApi = ()=>get("/api/users/list");
//更新头像
export const updataImageApi = (formData)=>postimg("/users/updateUserPic",formData);
//修改个人信息
export const amendInfoApi = (userId,password,username)=>post("/users/updateInfo",{userId,password,username});

