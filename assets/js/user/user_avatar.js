$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    var layer = layui.layer

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 模拟用户提交图片文件
    $("#btnChooseImages").on("click", function() {
        // 点击按钮, 模拟用户点击input上传文件的表单
        $("#file").click();
    })

    // 为文件选择框绑定change事件, 发生变化就触发
    $("#file").on("change", function(e) {
        // console.log(e);

        // 获取用户选择的文件
        var filelist = e.target.files;
        // console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg("请选择图片！")
        };

        // 1.拿到用户选择的文件
        var file = e.target.files[0]

        // 2.将文件 转化为路径
        var imgURL = URL.createObjectURL(file)

        // 3.重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为提交按钮绑定点击事件
    $("#btnUpload").on("click", function() {
        // 1. 首先获取图片信息
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2.把图片信息发送到服务器中
        $.ajax({
            url: "/my/update/avatar",
            method: "POST",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("头像更换失败！！！")
                }
                layer.msg("头像更换成功！！！");
                // 头像上传到服务器, 并且渲染到父亲的页面中
                window.parent.getUserInfo()
            }
        })
    })
})