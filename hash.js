//哈希加密  导入bcrypt  哈希的基本使用 与项目无关
const bcrypt = require('bcrypt');

async function run() {
    //生成随机字符串
    //接受一个数值作为参数 默认值10 数值越大 复杂度越高 加盐
    //返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密 第一个参数是明文密码 第二个参数是随机字符串
    const result = await bcrypt.hash('123', salt);
    console.log(salt);
    console.log(result);

}
run();