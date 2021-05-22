//引入 formidable第三方模块
const formidable = require('formidable');

const path = require('path');

const { Article } = require('../../model/article');

module.exports = (req, res) => {
    //res.send('p');//text

    //formidable 解析表单 支持get post请求参数、文件上传

    //1.创建表单解析对象
    const form = new formidable.IncomingForm();

    //2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

    //3.保留上传文件的后缀
    form.keepExtensions = true;

    //4.解析表单
    form.parse(req, async (err, fields, files) => {
        //1.err错误对象 若果表单解析失败 err存储错误信息 如果表单解析成功 err为null
        //2.fields 对象类型 保存普通表单数据
        //3.files 对象类型 保存了和上传文件的相关数据
        //res.send(files.cover.path.split('public')[1]);//text
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        res.redirect('/admin/article');
    })
};