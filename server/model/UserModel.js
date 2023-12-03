
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  firstName:{
    type:String,
    required:[true, "please enter user first name"]
  },
  lastName:{
    type:String,
    required:[true, "please enter user last name"]
  },

  mobile: {
    type: String,
    required: [true, "please enter mobile number"],
  },
  email: {
    type: String,
    required: [true, "please enter email "],
  },
  address:{
    type:String,
    required:[true, "please enter address"]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;