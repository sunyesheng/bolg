//将f返回的数组 编程对象 
function serializeToJson(form) {
    var result = {};
    //获取到用户填写的内容 JQuery提供一个方法 获取所有填写内容
    //返回一个数组  [{name:'email',value:'用户输入的内容'},{....}]  
    var f = form.serializeArray();
    f.forEach(function (item) {
        result[item.name] = item.value;//相当于result.email
    });
    return result;

};