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
  token: {
    type: String,
    required: false,
  },
  publication: {
    type: String,
    required: false,
  },
  hashnodeApiKey: {
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
