# 后台API
## Express 应用和 MongoDB 数据库之间如何关联

1. 首先建立一个简单的Express 应用
2. 会简单操作MongoDB数据库

 启动数据库
```
mongod --dbpath ~/data/db
```

启动8081端口的网页版数据库,打开8081网页版
```
mongo-express
```
nodemon 打开后台
安装 mongoose 包

```
npm install --save mongoose
```
我的数据库是babel:
调用 Mongoose#connect 方法连接本案例使用的 babel数据库:

```js
mongoose.connect('mongodb://localhost:27017/babel');
```
作用类似：

```js
var uri = require('./config.js').uri
mongoose.connect(uri);
```

传递给 mongoose.connect 方法的第一个参数是 MongoDB 数据库对应的连接字符串 URI，简单分析一下本案例数据库的 URI 字符串，它由三部分组成：

- mongodb:// 代表使用的协议

- localhost:27017 代表要连接的服务器地址，一个 MongoDB 服务器实例运行在本地 27017 端口

- babel 代表要连接的数据库名字

mongoose.connect 语句执行之后，我们并不能确定 Mongoose 成功连接上了 MongodDB 数据库，

还得添加以下检验代码：检验连接是否成功

```js
var db = mongoose.connection;
db.on('error', function(err){
  console.log('connection failed!', err);
});
db.once('open', function() {
  console.log('success!')
});
```

### post.js所导出的

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建一个Schema
const UserSchema = new Schema(
  {
    username: { type: String },
    password: { type: String }
    //数据库所对应的条目
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);
//User　会自动对应数据库中的 users 这个集合
//如：　Person  对应　people
```

检索数据库中的记录,反馈给管理员

```js
db.once('open', function() {
  User.find().exec(function(err, users) {
    console.log(users);
  });
});//检索数据库中的记录
```

上面把　User.find() 代码封装到了一个API(web API ),
这样触发条件就变了。只有用户发出'GET/users'请求的时候，
User.find()代码才会被执行

但是，我们为何不把代码写成这样呢？

```js
let users = User.find();
conole.log(users)
```

答案是：　find() 接口是一个异步函数，所以它的返回值　users 只能 在回调函数中使用。

.exec 字面意思就是执行，我们把回调函数穿给它做参数。

### body-parser

 是一个由 Expressjs 团队维护的 Express 中间件，它的功能是解析 HTTP 请求中的正文信息，

并把这些信息存储到 req.body 对象中，比方说，客户端提交 form 表单的数据。


### res.json 和 res.send 的区别

- res.send()可以发任何格式的请求,可以自动字符转换
- res.json()json 格式的请求

### 什么是 JSON ？

- JSON 指的是 JavaScript 对象表示法（JavaScript Object   Notation）
- JSON 是轻量级的文本数据交换格式
- JSON 独立于语言 *
- JSON 具有自我描述性，更易理解

### express()

创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数。
```js
var express = require('express');
var app = express();
```

### 跨域请求的解决方案

解决方案采用： https://github.com/expressjs/cors

cors 是 Cross Origin Resource Share ，安装了这个包就可以完成

```
Access-Control-Allow-Origin: *
```

这个设置了。

### 路由（Routing）

是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。

路由的定义由如下结构组成：app.METHOD(PATH, HANDLER)。

其中，app 是一个 express 实例；METHOD 是某个 HTTP 请求方式中的一个；

PATH 是服务器端的路径；HANDLER 是当路由匹配到时需要执行的函数。
