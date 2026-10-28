const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    userType: {
      type: String,
      required: [true, "UserType is required"],
      enum: ["admin", "customer", "ordinary"],
      default: "ordinary",
    },
    gender: {
      type: String,
      default: "Not specified",
    },
    age: {
      type: Number,
      default: 25,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
