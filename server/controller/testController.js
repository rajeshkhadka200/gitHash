export const testController = async (req, res) => {
  console.log("testController");
  const { commitMessage, changes, codeChanges, githubRepoUrl } = req?.body;
  // Handle the received data as needed

  console.log("Received commit message:", commitMessage);
  console.log("Received changes:", changes);
  console.log("Received code changes:", codeChanges);
  console.log("Received GitHub Repo URL:", githubRepoUrl);

  res.status(200).send("Received the payload successfully.");
};
