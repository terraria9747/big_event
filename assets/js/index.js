$(function() {
    getUserInfo()

    var layer = layui.layer
        // 退出登陆部分
    $(".quit").on("click", function() {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 1.清除本地的token
            localStorage.removeItem("token");

            // 2.跳转到登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })
})


function getUserInfo() {
    // 获取用户的基本信息
    $.ajax({
        method: "GET",
        url: "/my/userinfo",

        // 有权限的接口
        // headers 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取信息失败, 请重试");
            };

            layui.layer.msg("获取信息成功 ~");
            // 信息成功获取后
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // complete: 无论ajax请求成功还是失败, 都会执行
        //     // 在complete回调函数中, 可以使用 res.responseJSON拿到服务器响应回来的数据
        //     // console.log(res);
        //     if (res.responseJSON.message === "身份认证失败！" && res.responseJSON.status === 1) {
        //         // 1.强制删除token
        //         localStorage.removeItem("token");
        //         // 2.强制跳转到登录页面
        //         location.href = "/login.html"
        //     }
        // }
    })
}

function renderAvatar(msg) {
    // console.log(msg);

    // 命名
    var name = msg.nickname || msg.username

    // 欢迎文字
    $("#welcome").html("欢迎&nbsp;" + name)

    // 渲染图片
    if (msg.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", msg.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像
        $(".layui-nav-img").hide();
        // 首字母文字, 大写显示
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}