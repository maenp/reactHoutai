import React, { Component } from 'react'

import {get,post} from '@utils/http'
export default class UserInfo extends Component {
    render() {
        return (
            <div>
                用户信息
            </div>
        )
    }
    componentDidMount(){
        get('http://rap2api.taobao.org/app/mock/233049/user/list')
        .then(data=>{
            console.log(data)
        })

        
        // post('/bk1912/student',{page:20,limit:10})
        // .then(data=>{
        //     console.log(data)
        // })
    }
}
