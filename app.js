//引用express框架
const express = require('express');
//导入art-tempate
const template = require('art-template');
//引入 模块
const session = require('express-session');
//处理拼接路径
const path = require('path');
//引入body-parser模块 用来处理post请求
const bodyPaser = require('body-parser');
//创建网站服务器
const app = express();
//引入 dateformat模块 进行时间处理 日期的数据 没有在js中 而是在模板中
const dateFormat = require('dateformat');

//将数据连接的文件引入 没有返回任何 不需要用变量接受
require('./model/connect');

//处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 100

    }
}));

// 测试 观察能否创建用户
// require('./model/user.js')

//express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));

//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

//向模板内部导入dateformate变量
template.defaults.imports.dateFormat = dateFormat;

//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

//开放静态资源文件 css js image都属于静态资源文件 html需要数据库
app.use(express.static(path.join(__dirname, 'public')));

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串对象转换为对象类型
    //JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(8099);
console.log('网站服务器启动成功，请访问localhost');