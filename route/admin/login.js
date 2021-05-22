//导入用户集合构造函数  结构出来
const { User } = require('../../model/user');
//加密模块
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
    //接受请求参数 接受post请求  
    // res.send(req.body);
    //对请求参数做二次验证 因为浏览器可以禁用js的运行
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0)
        //return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });

    //根据邮箱地址 从数据库中查询用户信息
    //如果查询到了用户 user变量的值是对象类型
    //如果没有查询到用户 user变量为空
    let user = await User.findOne({ email });
    //查询到了用户
    if (user) {
        //将客户端传递过来的密码和数据库中的密码错误
        //密码进行了加密处理 解密
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //登录成功
            //用户名存储 将用户名存储在请求对象中
            req.session.username = user.username;
            //res.send('登录成功');
            //重定向到用户列表页面
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        }
        else {
            //登录不成功
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
        }
    }
    //没有查询到用户
    else {
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
};