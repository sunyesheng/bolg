//用来创建用户的 集合的

//引入mongoose模块
const mongoose = require('mongoose');

//哈希加密  导入bcrypt
const bcrypt = require('bcrypt');

//引入joi模块
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    //创建集合规则
    username: { type: String, required: true, minlength: 2, maxlength: 20 },
    email: { type: String,/*保证邮箱不重复*/unique: true, },
    password: { type: String,/*必须填写 */ required: true },
    role: { type: String, required: true },//分别用admin 和normal来设定
    state: { type: Number, default: 0 }//0为启用状态 1为禁止状态

});

//创建集合
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', userSchema);



//生命一个加密的方法 
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    //console.log(pass)
    //创建一个用户 进行登录
    const user = await User.create({
        username: 'sunyesheng',
        email: '1481633112@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })

};

//createUser();
//开放出去 让路由或者别人能拿到这个集合
//将用户集合作为模板成员进行导出


//用来验证用户信息
const validateUser = (user) => {

    //第三方模块 进行验证操作 joi  用来验证js对象规则 
    //将不同规则组合 获得符合自己的规则 来验证
    const shema = {
        //用户名
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值错误')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    //实施验证
    return Joi.validate(user, shema);

};
module.exports = {
    User,
    validateUser
}