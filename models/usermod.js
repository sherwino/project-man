//still need to edit all of this code

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  name: {
    type:     String,
    required: [true, "You need to enter a name"]
        },
  email:      String,
  password:   String,
  img:        String,
  admin:      Boolean

}

); //closes userSchema

const User = mongoose.model('User', userSchema);

module.exports = User;


// var UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     lowercase: true,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user',  'admin'],
//     default: 'user'
//   },
//   password: {
//     type: String,
//     min: 64,
//     max: 64
//   }
// });
//
// var UserSchema = new Schema({
//   email: {
//     type: String,
//     validate: function(email) {
//       return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
//     }
//   }
// });
