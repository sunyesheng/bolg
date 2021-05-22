const { User } = require('../../model/user')
module.exports = async (req, res) => {

    //标志  表示用当前访问的是用户管理界面
    req.app.locals.currentLink = 'user';

    //获取到地址栏的ID参数
    const { message, id } = req.query;

    //如果当前传递了id参数 
    if (id) {
        //修改操作
        //根据用户id查询
        let user = await User.findOne({ _id: id });

        //渲染用户编辑页面
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    }
    else {
        //添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
};