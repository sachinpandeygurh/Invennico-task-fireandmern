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
    type: String, // Store the profile picture as a buffer
    default: "https://res.cloudinary.com/brandads-tech/image/upload/v1661116705/cld-sample-3.jpg"
  },
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
