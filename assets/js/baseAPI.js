// 注意: 在每次发起 $.get(), $.post(), $.ajax() 请求之前, 
// 会先调用一次 ajaxPrefilter() 这个函数
// 在这个函数中, 我们可以获取到拼接好的url接口

$.ajaxPrefilter(function(options) {
    // 拼接接口的url
    options.url = "http://big-event-api-t.itheima.net" + options.url;
    // console.log(options);
})