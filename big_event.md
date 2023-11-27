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
### 4.业务逻辑
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


