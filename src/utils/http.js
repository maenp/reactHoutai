import {fetch as fetchPro} from 'whatwg-fetch'
import fetchjsonp from 'fetch-jsonp'
import qs from 'qs'

export const get=(url,data)=>{
    if(data){
        var str="";
        for(var key in data){
            str+=key+'='+data[key]+'&'
        }
        url+='?'+str.slice(0,-1)
    }
    var result=fetchPro(url,{
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    }).then(res=>res.json())
    return result
}

export const post=(url,data)=>{
    var result=fetchPro(url,{
        method: 'post',
        credentials: "include",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body:qs.stringify(data)
    }).then(res=>res.json())
    return result
}
//上传图片专用
export const postimg=(url,data)=>{
    var result=fetchPro(url,{
        method: 'post',
        body:data,
    }).then(res=>res.json())
    return result
}
export const jsonp=(url)=>{
    var result=fetchjsonp(url)
    .then(res=>res.json())
    return result
}