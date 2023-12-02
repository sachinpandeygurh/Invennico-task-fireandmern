const User = require("../model/UserModel");

exports.AddUser = async (req, res) => {
  // Extract data from request body
  const {
    firstName,
    lastName,
    mobile,
    email,
    address,
    status,
    profilePicture,
  } = req.body;

  if (!firstName || !lastName || !mobile || !email || !address || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newUser = await new User({
      firstName,
    lastName,
    mobile,
    email,
    address,
    status,
    profilePicture,
    }).save();
    
    res.status(201).send({
      success: true,
      message: "User Created Succesfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetUsers = async (req, res) => {
  try {
    const result = await User.find();

    res.status(201).json(result);
    // console.log(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne(
      { id: req.params._id },
      {
        $set: req.body,
      }
    );
    console.log(id);
    res
      .status(200)
      .send(result)
      .json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.UpdateUser =async(req, res)=>{
    try {
        const id = req.body.id;
        // console.log(req.body)
        const result = await User.updateOne({  _id: req.params.id}, {
          $set: req.body
        });
        if (!result) {
          return res.status(404).json({ message: 'user not found' });
        }
    
        res.status(200).json({ message: 'user updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      }
}


exports.findUser = async (req, res) => {
  try {
    const userId = req.params.id; 

    const result = await User.findById(userId);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}