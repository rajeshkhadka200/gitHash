import {
  generateMarkdown,
  getCommitDetails,
  manageAPIres,
  post,
  saveCommit,
} from "../utils/function.js";
import Repo from "../model/repoModal.js";

export const publishBlog = async (req, res) => {
  const { repoName, userName, githubRepoUrl, secretApiKey } = req.body;
  const branch = "main";

  try {
    const apiURL = `https://api.github.com/repos/${userName}/${repoName}/commits/${branch}`;
    const response = await getCommitDetails(apiURL); // hits to the gitHub api
    const commitData = response.data;
    const result = await manageAPIres(commitData, repoName); // extract the needed information from commit

    const repo = await Repo.findOne({ repoURL: githubRepoUrl });
    const markdown = await generateMarkdown(result);
    const blogRes = await post(result, markdown, secretApiKey);

    const newCommitRes = await saveCommit(
      result,
      blogRes,
      secretApiKey,
      githubRepoUrl
    );

    // save it only in first commit
    if (!repo) {
      const newRepo = new Repo({
        token: secretApiKey,
        repoName,
        repoURL: githubRepoUrl,
      });
      await newRepo.save();
    }
    res.status(200).json({
      success: true,
      blog: blogRes.data.publishPost.post.url,
      commit: newCommitRes.message,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: error.message, from: "Controller" });
  }
};
