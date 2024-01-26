import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const User = mongoose.model("User", userSchema);
export default User;
