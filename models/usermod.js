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
