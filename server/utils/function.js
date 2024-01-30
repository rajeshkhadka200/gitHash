import axios from "axios";
import User from "../model/userModal.js";
import Commit from "../model/commitModal.js";

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
    throw new Error("Unable to get the commit details from the api");
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
    throw new Error("Unable to handle the api response and manage the format");
  }
};

export const generateMarkdown = async (result) => {
  try {
    const markdown = `
    ## Commit Details : 👇
    - **SHA:** ${result.commitDetails.sha}
    - **Message:** ${result.commitDetails.message}
    - **Committer:** ${result.commitDetails.committer}
    - **Date:** ${result.commitDetails.date}
    ----------------------------------------------------
  
    ## Repository Details : 👇
    - **Repository Name:** ${result.repoDetails.repoName}
    - **User Name:** ${result.repoDetails.userName}
    - **Branch:** ${result.repoDetails.branch}
    ----------------------------------------------------
  
    ## Changed Files : 👇
    ${result?.filesDetails
      ?.map((file, index) => {
        if (
          file.filename.split(".").pop() === "yml" ||
          file.filename.split(".").pop() === "md" ||
          file.filename.split(".").pop() === "json"
        ) {
          return null;
        }

        return `
      #### ${index + 1}. ${
          file.status === "added"
            ? "  Added"
            : file.status === "modified"
            ? "  Modified"
            : "  Deleted"
        } : <mark> ${file.filename} </mark> 
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
  } catch (error) {
    throw new Error("Unable to generate the markdown");
  }
};

export const post = async (result, markdown, secretApiKey, commitLength) => {
  // identify who requested to publish the blog.

  const user = await User.findOne({ token: secretApiKey });
  const { hashnodeApiKey, publication } = user;
  if (!user) {
    throw new Error("Wrong api token");
  }
  console.log("user ", user);

  const title = result.commitDetails.message;
  const subtitle = result.commitDetails.message;

  const slug = result.commitDetails.sha + result.repoDetails.repoName;
  const graphqlEndpoint = "https://gql.hashnode.com";

  const mutation = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        id
        slug
        title
        subtitle
        author {
          username
        }
        coverImage {
          url
        }
        url
        readTimeInMinutes
        views
        publishedAt
      }
    }
  }
`;

  const variables = {
    input: {
      publicationId: publication,
      coverImageOptions: {
        coverImageURL:
          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
      title: title,
      subtitle,
      contentMarkdown: markdown,
      slug,
      tags: [],
      metaTags: {},
    },
  };

  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: hashnodeApiKey,
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables,
      }),
    });
    const result = await response.json();
    console.log("posted :" + result);
    return result;
  } catch (error) {
    console.log("Error in the publish :", error);
    throw new Error("Unable to publish the Blogpost ");
  }
};

export const saveCommit = async (result, blogRes, secretApiKey, repoURL) => {
  try {
    const newCommit = new Commit({
      token: secretApiKey,
      sha: result.commitDetails.sha,
      commitName: result.commitDetails.message,
      blogURL: blogRes.data.publishPost.post.url,
      blogTitle: blogRes.data.publishPost.post.title,
      blogId: blogRes.data.publishPost.post.id,
      blogImage: blogRes.data.publishPost.post.coverImage.url,
      readTime: blogRes.data.publishPost.post.readTimeInMinutes,
      repoURL,
    });
    await newCommit.save();
    return {
      message: `commit saved succeessfully: ${newCommit._id}`,
    };
  } catch (error) {
    console.log("saving commit ", error);
    throw new Error("Unable to save the commit");
  }
};