import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
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
