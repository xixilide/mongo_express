var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
const UserSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type:String },
    age: { type:Number}
  },
  { timestamps: true }
);
// UserSchema.pre('save', function(next) {
//   var user = this, SALT_FACTOR = 5;
//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if(err) return next(err);
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });//密码保护
module.exports = mongoose.model('User', UserSchema);
//将Schema转化为model,判断映射到哪个集合，特别注意大小写
//User　会自动对应数据库中的 users 这个集合
//如：　Person  对应　people
