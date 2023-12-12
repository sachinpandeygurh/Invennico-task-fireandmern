
const User = require("../model/UserModel");
const fs=require("fs");
exports.AddUser = async (req, res) => {
  // Extract data from request body
  
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      address,
      status,
    } = req.fields;
   const {profilePicture}=req.files;
  //  console.log(firstName,"firstName");
  //  console.log(lastName,"lastName");
  //  console.log(mobile,"mobile");
  //  console.log(email,"email");
  //  console.log(address,"address");
  //  console.log(status,"status");
  //  console.log(profilePicture,"profilePicture");
    if (!firstName || !lastName || !mobile || !email || !address || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userr = new User({ ...req.fields});
    if(profilePicture){
      userr.profilePicture.data = fs.readFileSync(profilePicture.path);
      userr.profilePicture.contentType = profilePicture.type;
    }
    await userr.save();
    res.status(201).send({
      success: true,
      message: "User Created Succesfully",
      userr,
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
    const result = await User.deleteOne({ id: req.params._id });
    res.status(200).json({
      result,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { $set: req.body };

    const result = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      updatedUser: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};




exports.findUser = async (req, res) => {
  try {
    const userId = req.params.id; 

    const result = await User.findById(userId);
    // console.log(result);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found successfully', result });
  } catch (error) {
    console.error("abhishek",error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

exports.PhotoController = async (req, res) => {
  try {
    const user = await User.findById(req.params.pid).select("profilePicture");
    if (user.profilePicture.data.data) {
      res.set("Content-type", user.profilePicture.contentType);
      return res.status(200).send(user.profilePicture.data.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

