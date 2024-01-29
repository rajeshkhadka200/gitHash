import axios from "axios";

export const getCommitDetails = async (apiURL) => {
  const token = process.env.GITHUB_CLIENT_ID;
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const manageAPIres = async (commitData, repoName) => {
  try {
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
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateMarkdown = async (result) => {
  const markdown = `
  ## Commit Details
  - **SHA:** ${result.commitDetails.sha}
  - **Message:** ${result.commitDetails.message}
  - **Committer:** ${result.commitDetails.committer}
  - **Date:** ${result.commitDetails.date}
  ----------------------------------------------------

  ## Repository Details
  - **Repository Name:** ${result.repoDetails.repoName}
  - **User Name:** ${result.repoDetails.userName}
  - **Branch:** ${result.repoDetails.branch}
  ----------------------------------------------------

  ## Changed Files
  ${result?.filesDetails
    ?.map((file) => {
      if (
        file.filename.split(".").pop() === "yml" ||
        file.filename.split(".").pop() === "md" ||
        file.filename.split(".").pop() === "json"
      ) {
        return null;
      }

      return `
    ### ${
      file.status === "added"
        ? "Added"
        : file.status === "modified"
        ? "Modified"
        : "Deleted"
    }: ${file.filename}
    - **Additions:** ${file.additions}
    - **Deletions:** ${file.deletions}
    - **Changes:** ${file.changes}

    \`\`\`javascript
    ${file.patch}
    \`\`\`
    `;
    })
    .filter(Boolean)
    .join("\n\n")}
`;

  return markdown;
};

export const publishBlog = async (title, markdown) => {};
