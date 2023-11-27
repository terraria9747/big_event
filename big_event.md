### 1.页面结构
![页面结构](img/01.登录页面.png)
![页面结构](img/02.后台主页.png)

---
### 2.把项目代码发送到GitHub
![把项目代码发送到GitHub](img/03.代码传到github.png)
![把项目代码发送到GitHub](img/04.添加分支.png)

```
<!-- 初始化仓库 -->
git init
<!-- 把代码提交到暂存区 -->
git add .
<!-- 提交已暂存的文件 -->
git commit -m "提交了基础代码"
<!-- 本地仓库与GitHub建立联系 -->
git remote add origin git@github.com:terraria9747/big_event.git
<!-- 上传代码 -->
git push -u origin master
<!-- 添加分支 -->
git checkout -b login
```

---
### 3.插件Live Server
![插件](img/05.Live%20Sever插件.png)
![插件](img/06.插件的使用.png)
![插件](img/07.关闭插件.png)


---
### 4.登录注册页面
1.用layui前端框架写出相关的样式<br>
<br>
2.写出登录模块和注册模块的交互效果<br>
点击 “没有账号? 去注册...” 按钮 跳转到 注册页面<br>
点击 “已有账号? 去登录...” 按钮 跳转到 登录页面<br>
<br>
3.接口文档连接<br>
```
https://apifox.com/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/doc-842135
```
4.在注册页面发起Ajax.post请求, 注册接口如下
```
http://big-event-api-t.itheima.net/api/reguser
```
5.在登陆页面发起Ajax.get请求, 登录接口如下
```
http://big-event-api-t.itheima.net/api/login
```
注意: 此时有个问题, 每次发起请求, 都要重新输一次 url接口, 代码太繁琐<br>
<br>
我们可以创建一个baseAPI文件, 用来解决这个问题<br>
注意: 在每次发起 $.get(), $.post(), $.ajax() 请求之前<br>
会先调用一次 ajaxPrefilter() 这个函数<br>
在这个函数中, 我们可以获取到拼接好的url接口<br>


---
#### 登录注册页面提交到远程仓库

```
<!-- 切换到login分支 -->
git checkout login
<!-- 提交所有代码 -->
git add .
git commit -m "完成了登录和注册功能的开发"
<!-- 把本地代码提交到GitHub -->
git push -u origin login
<!-- 合并远程仓库的代码 -->
git checkout master
git merge login
```

---
#### 创建新分支, 继续在新分支上进行开发
```
<!-- 新建index分支 -->
git checkout -b index
```

---
### index主页面
后台主页面结构
![主页面](img/09.后台主页面.png)

插件：layui快速开发
![主页面](img/10.layui快速布局后台页面.png)

侧栏区域
![侧栏](img/11.侧栏开发.png)
![侧栏](img/12.侧栏开发.png)

侧边互斥问题解决<br>
两个子菜单不能同时打开
![互斥](img/13.互斥问题.png)

layui图标
![layui图标](img/14.图标.png)

---
### iframe页面
![iframe页面](img/16.选中.png)

---
### 获取用户的基本信息
```
<!-- 获取信息接口: -->
/my/userinfo
<!-- 需要配置headers请求头的信息 -->
<!-- 从本地存储中取出token的值 -->
headers: {
    Authorization: localStorage.getItem("token") || ""
},
```
![获取用户信息](img/17.获取用户信息.png)

有/my/的接口为有权限的接口 <br>
为每个有权限的接口都要添加headers请求头的信息 <br>
可以将公共部分写到 baseAPI.js文件中<br>
```
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
})

```

---
### 渲染头像
如果用户原来有头像, 就用原先的头像<br>
如果没有, 就有首字母大写组成的文字头像<br>

---
### 退出登录
* 1.去除本地存储的token<br>
* 2.跳转到登录页面<br>

![退出登录](img/18.退出询问框.png)

---
### 控制用户的访问权限
* 1.如果用户没有登录, 直接访问index.html
* 2.强制清除token
* 3.强制跳转到登录页面
