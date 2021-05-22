//用户集合的构造函数  引入user
const { User, validateUser } = require('../../model/user');

//引入加密模块 
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //res.send('ok');
    //res.send(req.body);
    try {
        await validateUser(req.body);
    }
    catch (e) {
        //验证没有通过 返回原来的界面 并且报告错误信息
        // return res.redirect('/admin/user-edit?message=' + e.message);
        // next只接受一个参数（字符串）     使用JSON.stringify() 将对象数据转换成字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));//需要使程序停止 所以加return
    }
    //向数据库中查询 查看邮箱是否唯一
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //如果用户已经存在 说明邮箱地址已经被别人占用
        // return res.redirect('/admin/user-edit?message=邮箱已经被注册');
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已经被注册' }));
    }

    //对密码进行加密处理
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //向数据库中添加数据
    await User.create(req.body);
    //重定返回页面
    res.redirect('/admin/user');
}