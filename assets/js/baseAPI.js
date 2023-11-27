// 注意: 在每次发起 $.get(), $.post(), $.ajax() 请求之前, 
// 会先调用一次 ajaxPrefilter() 这个函数
// 在这个函数中, 我们可以获取到拼接好的url接口

$.ajaxPrefilter(function(options) {
    // 拼接接口的url
    options.url = "http://big-event-api-t.itheima.net" + options.url;
    // console.log(options);

    // 为所有有权限的接口添加 headers
    // 有 /my/ 的为有权限的接口
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 优化complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.message === "身份认证失败！" && res.responseJSON.status === 1) {
            // 1.强制删除token
            localStorage.removeItem("token");
            // 2.强制跳转到登录页面
            location.href = "/login.html"
        }
    }
})