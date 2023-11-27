$(function() {
    // 点击登录按钮, 跳转到登录页面
    $(".link_login").click(function() {
        $(".reg_box").hide();
        $(".login_box").show();
    })

    // 点击注册按钮, 跳转到注册页面
    $(".link_reg").click(function() {
        $(".login_box").hide();
        $(".reg_box").show();
    })

    // 自定义表单验证
    var form = layui.form
    form.verify({
        // 定义一个新的验证规则 pwd
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位, 且不能出现空格'
        ],

        // 验证两次密码输入是否一致
        // value: 验证密码的值
        repwd: function(value) {
            // 属性选择器 选择了 密码的值
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return "两次输入的密码不一致, 请检查后重试!!!"
            }
        }
    })

    // 发起注册请求
    $("#reg_form").on("submit", function(e) {
        // 阻止默认行为
        e.preventDefault()

        // 弹出框
        var layer = layui.layer;

        // 数据
        var data = {
            username: $("#reg_form [name=username]").val(),
            password: $("#reg_form [name=password]").val(),
        }

        // 发起ajax的post请求
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功, 请登录！！！")

            // 注册成功后跳回到登录页面
            $(".link_login").click()
        })
    })

    // 发起登录请求
    $("#login_form").submit(function(e) {
        // 阻止默认行为
        e.preventDefault()

        $.ajax({
            // url: "http://big-event-api-t.itheima.net/api/login",
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("用户名或密码错误")
                }
                layer.msg(res.message)

                // console.log(res);
                // 在本地存储存储 token
                // 后期有权限的接口 需要 token
                localStorage.setItem("token", res.token)

                // 登录成功后跳转到后台主页面
                location.href = "/index.html"
            }
        })
    })
})