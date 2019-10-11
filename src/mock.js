var Mock = require('mockjs')
var url = require('url')
var qs = require('qs')
var Random = Mock.Random
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|105': [{
        'id|+1': 0,// 属性 id 是一个自增数，起始值为 1，每次增 1
        'authname': '@cname()',//随机生成一个中文名字
        'tel': /^1[3579]\d{9}$/,//随机生成手机号
        //随机生成一张图片   图片大小    图片颜色   字体颜色  字样(中文颜色可能会出错)
        'Img': Random.image('200x100', '#00405d', '#FFF', '自定义'),
        'address': '@county(true)'//随机生成地址
    }]
})
// // 输出结果
// console.log(JSON.stringify(data, null, 4))
// 

// 拦截 GET请求
Mock.mock(/\/bk1912\/student/,'get',req=>{ //req是请求的数据
    let {page,limit}=url.parse(req.url,true).query
    let arr=[]

    //一般写法  当数据不足时返回 null
    // for(var i=(page-1)*limit;i<page*limit;i++){
    //     arr.push(data.list[i])
    // }

    //升级版写法 当数据不足时，那就返回不足limit个的数据，或者返回空数组
    // for(var i=(page-1)*limit;i<Math.min(data.list.length,(page*limit));i++){
    //     arr.push(data.list[i])
    // }

    //完美写法 当数据不足时，那就返回最后的 limit个数据
    for(var i=Math.min(data.list.length-limit,(page-1)*limit);i<Math.min(data.list.length,(page*limit));i++){ 
        arr.push(data.list[i])
    }
    return arr
})


//拦截 POST 请求
Mock.mock(/\/bk1912\/student/, 'post', req => {
    let { page, limit } = qs.parse(req.body)
    let arr = []
    for (var i = Math.min(data.list.length - limit, (page - 1) * limit); i < Math.min(data.list.length, (page * limit)); i++) {
        arr.push(data.list[i])
    }
    return arr
})










