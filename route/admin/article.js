//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');

//导入mongoose-sex-page模块 接受一个集合的构造函数作为参数
const pagination = require('mongoose-sex-page');

const dateFormat = require('dateformat');

const { json } = require('body-parser');

module.exports = async (req, res) => {

    // //标志  表示用当前访问的是文章管理界面
    req.app.locals.currentLink = 'article';

    //查询文章所有数据
    //let articles = await Article.find();

    // res.render('admin/article.art', {
    //     articles: articles
    // });

    //接受客户端传递过来的当前页码数
    let page = req.query.page || 1;

    // //每一页显示的数据数 10
    let pagesize = 5;

    // //查询用户的数据总数
    let count = await Article.countDocuments({});

    // //计算总页数 总页数=数据量/每一页数据数
    let total = Math.ceil(count / pagesize);
    //res.send('总页数是' + total)

    // //页码对应的开始位置
    let start = (page - 1) * pagesize;
    //res.send('shi' + start);

    // //查询所有文章数据 .lean().populate('author')
    let articles = await Article.find({}).populate('author').limit(pagesize).skip(start).lean();

    //res.send(articles);

    //渲染文章列表页面模板

    res.render('admin/article.art', {
        articles: articles,
        //当前是多少页
        page: page,
        //总页数 
        total: total
    });
};