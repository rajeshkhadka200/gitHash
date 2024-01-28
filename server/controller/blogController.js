import axios from "axios";

export const publishBlog = async (req, res) => {
  const { repoName, userName, token } = req.body;
  const branch = "main";

  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}/commits/${branch}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
    });
    const commitData = response.data;

    const result = {
      commitDetails: {
        sha: commitData.sha,
        message: commitData.commit.message,
        committer: commitData.commit.committer.name,
        date: commitData.commit.committer.date,
      },
      repoDetails: {
        repoName,
        userName: "rajeshkhadka200",
        branch: "main",
      },
      filesDetails: [],
    };

    commitData.files.forEach((file) => {
      const fileDetails = {
        filename: file.filename,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        status: file.status,
        patch: file.patch,
      };
      result.filesDetails.push(fileDetails);
    });

    res.status(200).json({
      mesg: "Successfully fetched commit data",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg: "Internal server error",
      error,
    });
  }
};
