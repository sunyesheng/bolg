module.exports = (req, res) => {

    //标志  表示用当前访问的是文章管理界面
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit.art');
};