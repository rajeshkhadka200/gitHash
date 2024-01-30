import mongoose from "mongoose";

const commitSchema = new mongoose.Schema({
  repoURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  sha: {
    type: String,
    required: true,
  },
  commitName: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  blogURL: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  readTime: {
    type: Number,
    required: true,
  },
});
const Commit = mongoose.model("Commit", commitSchema);
export default Commit;
