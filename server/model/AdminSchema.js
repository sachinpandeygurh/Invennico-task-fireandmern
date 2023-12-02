const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  DoB: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Admin", userSchema);

module.exports = User;