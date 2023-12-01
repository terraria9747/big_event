$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 准备分页
    var laypage = layui.laypage;

    // 时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())


        return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
    }

    // 补0
    function padZero(n) {
        return n > 9 ? n : "0" + n
    }


    // 定义查询对象q
    // var q = {
    //     pagenum: 1, // 当前页码数
    //     pagesize: 2, // 当前页需要的数据条数
    //     cate_id: "", // 文章分类id
    //     state: "", // 文章状态(可选值"已发布"或"草稿")
    // }

    // ===============================================
    initTable()

    // 渲染前端页面

    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("渲染页面失败")
                }

                // 使用模板引擎渲染页面的数据
                var htmlStr = template("tpl_table", res);
                $("tbody").html(htmlStr)

                // 渲染分页区域
                // 在上部数据渲染完成后, 开始渲染分页区域
                // res.data.length ===> 数据的长度, 即数据的条数
                renderPage(res.data.length);
            },
        })
    }

    // ===============================================
    // 接口无数据, 模拟数据
    // var data = {
    //     "data": [{
    //             "Id": 5961,
    //             "title": "震惊!!!一个00年出生的孩子10年后居然成家立业了",
    //             "pub_date": "2022-5-10 14:53:52.604",
    //             "state": "已发布",
    //             "cate_name": "体育"
    //         },
    //         {
    //             "Id": 5962,
    //             "title": "新闻发布丨持续优化出口退税服务 助力龙江外贸向好发展",
    //             "pub_date": "2023-5-10 12:54:12.904",
    //             "state": "已发布",
    //             "cate_name": "政治"
    //         }, {
    //             "Id": 5962,
    //             "title": "基辛格逝世",
    //             "pub_date": "2023-2-10 14:54:54.904",
    //             "state": "已发布",
    //             "cate_name": "逝世"
    //         }, {
    //             "Id": 5962,
    //             "title": "海底捞跳科目三有顾客嫌吵起冲突报警",
    //             "pub_date": "2023-11-10 12:14:54.904",
    //             "state": "已发布",
    //             "cate_name": "冲突"
    //         }, {
    //             "Id": 5962,
    //             "title": "应公布阿里公务员献血事件小姑姑身份",
    //             "pub_date": "2023-12-10 12:14:30.904",
    //             "state": "已发布",
    //             "cate_name": "献血"
    //         }
    //     ],
    //     "total": 3
    // }
    // var htmlStr = template("tpl_table", data);
    // $("tbody").html(htmlStr)


    // ===============================================
    // 获取-文章分类列表
    initOpt();

    function initOpt() {
        $.ajax({
            url: "/my/article/cates",
            method: "GET",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类列表数据失败")
                };

                // 渲染模板引擎
                var optStr = template("tpl_opt", res);
                $("[name=cate_id]").html(optStr)

                // 通知layui重新渲染页面
                form.render()
            }
        })
    }


    // 提交筛选表单, 显示表单内容
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认行为
        e.preventDefault();
        var id = $("[name=cate_id]").val()
        console.log(id);

        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取指定的数据失败")
                }
                console.log(res);
                var htmlStr = template("tpl_table_one", res)
                $("tbody").html(htmlStr)
                layer.msg("获取指定的数据成功")
            }
        })
    })


    // 渲染分页区域
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 注意，这里的 test1 是 ID，不用加 # 号
            count: total, // 数据总数，从服务端得到
            limit: 3, // 每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
            curr: 1, // 起始页面

            // 自定义layout
            layout: ["count", "limit", "prev", "page", "next", "skip"],

            // 自定义 多少页 
            limits: [2, 4, 6, 8, 10],

            // jump回调函数拿到 按钮的索引值

            // 1.点击页面 ==> 触发jump回调 ==> undefined
            // 2.调用了 laypage.render() ==> 触发jump回调 ==> true
            jump: function(obj, first) {
                // console.log(obj);
                console.log(obj.curr, first);
                // console.log(first);
                // 直接调用 initTable 会造成死循环

                // 接口不可用
                // if (!first) {
                //     // 重新渲染页面
                //     initTable()
                // }
            }
        });
    }

    // 删除文章, 通过代理的方式显示绑定点击事件
    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id")
        layer.confirm('是否要删除该条信息?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: "/my/article/deletecate/" + id,
                method: "GET",
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除数据失败");
                    }
                    layer.msg("该条数据已被成功删除");
                    initTable();
                }
            })
        });
    })
})