const User = require("../model/AdminSchema");

const registerUser = async (req, res) => {
  const { name, mobile, email, DoB } = req.body;

  if (!mobile || !email || !DoB || !name) {
    return res.status(400).json({ message: "All fields are required" });

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

  if (!mobile || !email) {

    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {

    const user = await User.findOne({ mobile: mobile, email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found please Register" });

    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const updateAdmin = async (req, res) => {
  try {
    const email = req.body.email;

    const result = await User.updateOne({ email: email }, { $set: req.body });
// console.log(result)
    if (result.nModified > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      const { name, mobile, email, DoB, photo } = req.body;

      try { 
        const newUser = await new User({
          name,
          mobile,
          email,
          DoB, 
          photo,
        }).save();

        res.status(201).send({
          success: true,
          message: "User created successfully",
          newUser,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  registerUser,
  login,
  updateAdmin
};

