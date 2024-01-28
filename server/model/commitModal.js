import mongoose from "mongoose";

const commitSchema = new mongoose.Schema({
  commitName: {
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
});
const Commit = mongoose.model("Commit", commitSchema);
export default Commit;
