const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //res.send('ok');

    //接受客户端传递过来的请求参数
    const { username, email, role, state, password } = req.body;

    //获取即将要修改的用户id
    const id = req.query.id;

    //res.send(user);//测试
    //获取用户的密码  测试
    // res.send(body.password);
    let user = await User.findOne({ _id: id });

    //密码比对  用到bcrypt模块  返回一个布尔值
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        //密码比对成功 将用户信息更新到数据库
        //res.send('密码比对成功'); //text
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });

        //页面的重定向 用户列表页面
        res.redirect('/admin/user');

    } else {
        //res.send('密码比对no成功');//text
        let obj = { path: '/admin/user-edit', message: '密码比对失败，无法更改信息', id: id };
        next(JSON.stringify(obj));
    }
};