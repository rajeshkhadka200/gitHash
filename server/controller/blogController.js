import axios from "axios";
import User from "../model/userModal.js";
import { getCommitDetails, manageAPIres } from "../utils/function.js";
import Repo from "../model/repoModal.js";

export const publishBlog = async (req, res) => {
  const { repoName, userName, token, repoURL } = req.body;
  const branch = "main";

  try {
    const apiURL = `https://api.github.com/repos/${userName}/${repoName}/commits/${branch}`;

    const response = await getCommitDetails(apiURL); // hits to the gitHub api
    const commitData = response.data;
    const result = await manageAPIres(commitData, repoName); // extract the needed information from commit

    // identify who requested to publish the blog.
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({
        mesg: "Invalid GitHash Token",
      });
    }

    // if the user has already published the blo under this repo or not
    const repo = await Repo.findOne({ repoURL });
    if (repo) {
      console.log("publih under the repo");
    } else {
      console.log("Start a new series");
    }

    res.status(200).json({
      mesg: "Successfully fetched commit data",
      result,
    });
  } catch (error) {
    res.status(500).json({
      mesg: "Internal server error",
      error,
    });
  }
};
