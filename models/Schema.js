const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: "String",
      required: true,
    },
    created: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
