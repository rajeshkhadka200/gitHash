export const publishBlog = async (req, res) => {
  console.log("postblogController");

  const { commitMessage, changes, codeChanges, githubRepoUrl } = req?.body;
  // Handle the received data as needed
  const apiKey = req.header("Authorization");

  console.log("commit message:", commitMessage);
  console.log("changes:", changes);
  console.log("code changes:", codeChanges);
  console.log("GitHub Repo URL:", githubRepoUrl);
  console.log("Key:", apiKey);

  res.status(200).json({
    data: req.body,
  });
};
