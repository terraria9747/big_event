$(function() {
    // 自定义昵称格式 1~6位
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称字符在1~6位之间！"
            }
        }
    })

    initUserInfo()

    // 初始化表单数据
    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            method: "GET",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }

                // 快速获取表单信息并赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 重置表单内容
    $("#ResetBtn").on("click", function(e) {
        // 阻止默认行为
        e.preventDefault()

        // 重新加载初始数据
        initUserInfo();
        layer.msg("重置成功")
    })

    // 提交表单的数据修改, 更新表单的数据
    $(".layui-form").on("submit", function(e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url: "/my/userinfo",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败")
                }
                layer.msg(res.message)

                // 用户信息修改成功后, 把相关的信息渲染到父页面中
                window.parent.getUserInfo();
            }
        })
    })
})