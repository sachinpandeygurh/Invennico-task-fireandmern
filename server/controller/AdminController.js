const User = require("../model/AdminSchema");


const registerUser = async (req, res) => {
  const { name, mobile, email, DoB } = req.body;

  if (!mobile || !email || !DoB || !name ) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }

  try {
    const userExist = await User.findOne({ mobile });
    if (userExist) {
      return res.status(400).json({
        message: "User is already registered",
      });
    }

    const newUser = new User({
      email: email,
      name: name,
      mobile: mobile,
      DoB: DoB,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const user = await User.findOne({ mobile: mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  login,
};