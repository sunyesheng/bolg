//登录拦截
const guard = (req, res, next) => {
    //判断用户访问的是否是登录页面
    //判断用户的登录状态
    //若果用户是登录的 将请求方形
    //如果用户不是登录的 将重新定向的登录界面
    if (req.url != '/login' && !req.session.username) {
        //重定向到登录页面
        res.redirect('/admin/login');
    }
    else {
        //用户是登录状态 请求放行
        next();
    }
};

module.exports = guard;