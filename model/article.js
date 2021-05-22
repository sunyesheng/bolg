//引入mongosoe 模块
const mongoose = require('mongoose');

//创建规则 创建schema实例
const articleSchema = new mongoose.Schema({
    //文章标题
    title: {
        type: String,
        maxlength: 20,
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    //作者
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    //发布时间
    publishDate: {
        type: Date,
        dafault: Date.now,
    },
    //文章封面
    cover: {
        type: String,
        defaule: null
    },
    //文章内容
    content: {
        type: String
    }

});

//根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

//将集合规则作为模块成员导出
module.exports = {
    Article
};