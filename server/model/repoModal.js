import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  repoName: {
    type: String,
    required: true,
  },
  repoURL: {
    type: String,
    required: true,
  },
});
const Repo = mongoose.model("Repo", repoSchema);
export default Repo;
