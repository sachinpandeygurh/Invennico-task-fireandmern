const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected`);
  } catch (error) {
    console.log({ message: "internal error" });
  }
};



module.exports = dbConnect;