var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    password: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
//User　会自动对应数据库中的 users 这个集合
//如：　Person  对应　people
