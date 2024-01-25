export const publishBlog = async (req, res) => {
  console.log("postblogController");

  const { commitMessage, changes, codeChanges, githubRepoUrl } = req?.body;
  // Handle the received data as needed

  console.log("commit message:", commitMessage);
  console.log("changes:", changes);
  console.log("code changes:", codeChanges);
  console.log("GitHub Repo URL:", githubRepoUrl);

  res.status(200).json({
    data: req.body,
  });
};
