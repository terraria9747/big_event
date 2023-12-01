$(function() {
    var layer = layui.layer;
    var form = layui.form

    // 图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    initCate();
    // 初始化富文本编辑器
    initEditor();
    // 渲染复选框
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("渲染复选框失败")
                }
                var htmlStr = template("tpl_cate", res)
                $("select").html(htmlStr);

                // 渲染前端页面
                form.render()
                layer.msg("渲染复选框成功")
            }
        })
    }

    $("#btnImageChoose").on("click", function() {
        $("#coverImage").click()
    })

    $("#coverImage").on("change", function(e) {
        // 检测 coverImage 是否发生变化
        var file = e.target.files[0]
        if (file.length <= 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 发布状态
    var art_state = "已发布";

    // 点击存为草稿按钮, 状态改为 "草稿"
    $("#saveBtn2").on("click", function() {
        art_state = "草稿"
    });


    // 提交事件
    $("#form-pub").on("submit", function(e) {
        // 1.阻止默认提交行为
        e.preventDefault();

        // 2.基于 form 表单, 快速创建一个 FormData对象
        var fd = new FormData($(this)[0])

        // 3.将文章的发布状态, 存到fd中
        fd.append("state", art_state)

        // 4.获取裁剪后的图片文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
            })

        // 请求无法发出
        // publishArticle(fd)
    })

    // =================================================
    // 请求无法发出
    // 定义一个发布文章的方法
    // function publishArticle(fd) {
    //     $.ajax({
    //         url: "/my/article/add",
    //         method: "POST",
    //         data: fd,
    //         // 如果向服务器提交的是 FormData 格式的数据
    //         // 必须添加两个配置项
    //         contentType: false,
    //         processData: false,
    //         success: function(res) {
    //             console.log(res);
    //         }
    //     })
    // }
    // =================================================

})