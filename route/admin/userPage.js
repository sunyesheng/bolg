//导入用户结合构造函数 使用结构
const { User } = require('../../model/user');

module.exports = async (req, res) => {

    //标志  表示用当前访问的是用户管理界面
    req.app.locals.currentLink = 'user';

    //接受客户端传递过来的当前页码数
    let page = req.query.page || 1;

    //每一页显示的数据数 10
    let pagesize = 10;

    //查询用户的数据总数
    let count = await User.countDocuments({});

    //计算总页数 总页数=数据量/每一页数据数
    let total = Math.ceil(count / pagesize);
    //res.send('总页数是' + total)

    //页码对应的开始位置
    let start = (page - 1) * pagesize;
    //将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);

    //渲染用户列表模块
    res.render('admin/user.art', {
        users: users,
        //当前是多少页
        page: page,
        //总页数
        total: total
    });
}