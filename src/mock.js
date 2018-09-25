// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

//登录数据
let loginarr = {
    'status':'false',
    'data':{
        'username':'admin',
        'pwd':'123456'
    }
}
let login = function(options){
    //  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
        let rtype = options.type.toLowerCase(); //获取请求的类型
        switch (rtype) {
            case 'get':
                break;
            case 'post':
                let obj = JSON.parse(options.body).params.obj;
                if(obj.username == loginarr.data.username && obj.pwd == loginarr.data.pwd){
                    loginarr.status = true;
                }else{
                    loginarr.status = false;
                }
                break;
            default:
                break;
        }
        return {
            data: loginarr
        }
    }
  Mock.mock('/login',/get|post/i,login);

// 登录数据的修改操作
let loginUpdate = function(options){
    let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let obj = JSON.parse(options.body).params.obj;
            loginarr.data.username = obj.username
            loginarr.data.pwd = obj.pwd
            break;
        default:
            break;
    }
    return {
        data: loginarr
    }
  }
  Mock.mock('/loginEdit',/get|post/i,loginUpdate);


//文章分类搜索
Mock.mock('/get_article_sort', {
    "data": [
        {'id':'1','name':'vue'},
        {'id':'2','name':'html+css'},
        {'id':'3','name':'js'},
    ]        
});

//文章
let arr = [
    {'id':'1','title':'vue中请求本地数据','author':'admin','cover':'图片1','summary':'admin','content':'admincontent1','name':'vue','createtime':'2018-08-12','watch':'145','recommend':'1','scope':'1'},
    {'id':'2','title':'事件的委托（代理 Delegated Events）的原理以及优缺点','cover':'图片2','author':'admin','summary':'admin','content':'admincontent2','name':'js','createtime':'2018-05-18','watch':'788','recommend':'1','scope':'0'},
    {'id':'3','title':'input上传按钮美化','author':'admin','cover':'图片3','summary':'admin','content':'admincontent3','name':'html+css','createtime':'2018-04-05','watch':'585','recommend':'0','scope':'1'},
]

// 文章的获取删除操作
let list = function (options) {
    let rtype = options.type.toLowerCase(); //获取请求类型
    switch (rtype) {
    case 'get':
        break;
    case 'post':
        let id = JSON.parse(options.body).params.id //获取删除的id
        if(id.length>1){//批量删除
             for(let i =0;i<id.length;i++){
                arr = arr.filter(function(val){
                    return val.id!=id[i].id;//把这个id对应的对象从数组里删除
                });
             }
        }else{
            arr = arr.filter(function(val){
             return val.id!=id;//把这个id对应的对象从数组里删除
            });
        }
        break;
    default:
    }
    return {
       data: arr
    } //返回这个数组,也就是返回处理后的假数据
 }
Mock.mock('/get_articles', /get|post/i, list);//get用于请求数据，post用于删除数据
