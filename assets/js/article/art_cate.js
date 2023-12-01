$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            method: "GET",
            success: function(res) {
                // console.log(res);
                var htmlStr = template("art_cate_tpl", res)
                $("tbody").html(htmlStr)
            }
        })
    }

    var indexAdd = null;
    $("#dialog-add").click(function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            // 后台js渲染前端页面
            content: $("#HtmlAdd").html(),
        });
    })

    // 通过代理的方式给 "确认添加" 按钮绑定点击事件
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();

        // 发起添加信息的请求
        $.ajax({
            url: "/my/article/addcates",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("信息添加失败!!!")
                }
                initArtCateList();
                layer.msg("信息添加成功!!!")
                layer.close(indexAdd)
            },
        })
    })

    // 通过代理的方式绑定点击事件
    var indexEdit = null;
    $("tbody").on("click", "#btn-edit", function(e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            // 后台js渲染前端页面
            content: $("#HtmlEdit").html(),
        });

        // 获取id, 自定义属性 data-id
        var Id = $(this).attr("data-id")
        $.ajax({
            url: "/my/article/cates/" + Id,
            method: "GET",
            success: function(res) {
                console.log(res);
                form.val("form-edit", res.data)
            }
        })
    })

    // 通过代理完成 表单提交事件, 这里是修改表单的内容
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/updatecate",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改表单内容失败");
                }

                // 关闭窗口
                layer.close(indexEdit);
                // 重新渲染前端页面
                initArtCateList();
                // 提示
                layer.msg("修改表单内容成功");
            }
        })
    })

    // 通过代理完成 表单删除事件
    $("body").on("click", "#btn-delete", function(e) {
        e.preventDefault();

        var Id = $(this).attr("data-id")
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: "/my/article/deletecate/" + Id,
                method: "GET",
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除消息失败");
                    }

                    initArtCateList();
                    layer.msg("删除消息成功");
                    layer.close(indexEdit)
                }
            })
        });

    })
})