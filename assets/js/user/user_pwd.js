$(function() {
    // 密码校验规则
    var form = layui.form
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新密码不能与旧密码一致!!!"
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码输入的不一致!!!"
            }
        }
    })

    // 发起ajax请求, 修改密码
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()

        $.ajax({
            url: "/my/updatepwd",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败")
                }

                layer.msg(res.message)

                // 重置页面
                $(".layui-form")[0].reset()
            }
        })
    })
})