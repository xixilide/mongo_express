var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;//解决异步操作出现的错误
mongoose.connect('mongodb://localhost:27017/babel');
//连接我的数据库　－－babel
var User = require('./models/post');
//已经启动27017 端口
var db = mongoose.connection;
var bodyParser = require('body-parser');
//它的功能是解析 HTTP 请求中的正文信息，并把这些信息存储到 req.body 对象中，比方说，客户端提交 form 表单的数据。
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // 如果想使用 form 提交，这一行是必要的
var cors= require('cors');
app.use(cors());//使用中间件
db.on('error', console.log);

db.once('open', function() {
 //  var post = new User({username:"xixilide",
 //    password:"111",
 //    email:"221www@sina.com",
 //    age:"23"});
 // post.save(function(err){
 //   if(err) console.log(err);
 // })
 console.log('success!');
});

db.once('open', function() {
  User.find().exec(function(err, users) {
    console.log("seccuss");
  })
})//exec 检索数据库中的记录

app.get('/users', function(req,res ){
  User.find().exec(function(err, users) {
    res.json({users})
  })
})
//可以在web API 中体现

app.get('/users/:_id', function(req,res ){
  User.findById(req.params._id,function (err,user) {
     if(err) return console.log(err);
     console.log(user);
     res.send(user)
})
})
//取得每个用户id来获取

// app.get('/users/:username', function(req,res ){
//   User.find({username:req.params.username},function (err,user) {
//     if(err) return console.log(err);
//       res.send({user})
//   })
// })
//注意：/:username :不能省略
app.listen(4000, function() {
  console.log('Express server is listening on port 4000')
})
//后台端口，不能与前台相同
