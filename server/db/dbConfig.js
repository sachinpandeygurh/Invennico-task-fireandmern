const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://grv:MUMMA@cluster0.ujdypjd.mongodb.net/");
    console.log(`Database Connected`);
  } catch (error) {
    console.log({ message: "internal error" });
  }
};



module.exports = dbConnect;