const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(`DB Connection Error \n ${error}`);
  }
};

module.exports = connectDB;
