// import mongoose from "mongoose";
const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    form: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    // fullname:{ type:String , default : last_name +" " first_name},
    username: {
      type: String,
      min: 6,
      // max: 32,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      // max: 32,
      required: true,
    },
    email: {
      type: String,
      min: 6,
      // max: 32,
      required: true,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    access: {
      type: String,
      default: "user",
    },
    isSex: { type: String, required: true },
    docs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "docs",
      },
    ],
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles",
      },
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("user", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;
