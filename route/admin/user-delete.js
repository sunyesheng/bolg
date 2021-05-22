const { User } = require('../../model/user');

module.exports = async (req, res) => {
    //res.send('ok');//text

    //获取要删除的用户id （get）
    //res.send(req.query.id);//text
    await User.findOneAndDelete({ _id: req.query.id });

    //将页面重定向到用户列表页面
    res.redirect('/admin/user');
}