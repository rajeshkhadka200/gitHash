import axios from "axios";
import User from "../model/userModal.js";
import Commit from "../model/commitModal.js";
import MindsDB from "mindsdb-js-sdk";

export const getCommitDetails = async (apiURL) => {
  const token = process.env.GITHUB_CLIENT_ID;
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response from github api " + response);
    return response;
  } catch (error) {
    console.log(error);
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
    console.log("response from managing api result " + result);
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
      #### ${index}. ${
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
      -----------------------------------------------      
  `;

    return markdown;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to generate the markdown");
  }
};

export const post = async (result, markdown, secretApiKey, blogSummary) => {
  // identify who requested to publish the blog.

  const user = await User.findOne({ token: secretApiKey });
  const { hashnodeApiKey, publication } = user;
  if (!user) {
    throw new Error("Wrong api token");
  }

  const title = result.commitDetails.message;
  let capitalizedTitle = `${title.charAt(0).toUpperCase() + title.slice(1)} (${
    result.repoDetails.repoName
  } )`;
  const subtitle = "My latest Commit : " + result.commitDetails.message;

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
          "https://firebasestorage.googleapis.com/v0/b/mero-room-f06e5.appspot.com/o/images%2FREPO%20UPDATE%20(1).png?alt=media&token=cdd1985e-4239-4187-852f-9b196627a513",
      },
      title: capitalizedTitle,
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
    console.log("posted blog :" + result);
    return result;
  } catch (error) {
    console.log("Error in the publish :", error);
    throw new Error("Unable to publish the Blogpost ");
  }
};

export const saveCommit = async (result, blogRes, secretApiKey, repoURL) => {
  try {
    const { sha, message } = result.commitDetails;
    const { url, title, id, readTimeInMinutes } = blogRes.data.publishPost.post;
    const newCommit = new Commit({
      token: secretApiKey,
      sha: sha,
      commitName: message,
      blogURL: url,
      blogTitle: title,
      blogId: id,
      blogImage: blogRes.data.publishPost.post.coverImage.url,
      readTime: readTimeInMinutes,
      repoURL,
    });
    await newCommit.save();
    console.log("commit saved succeessfully: " + newCommit._id);
    return {
      message: `commit saved succeessfully: ${newCommit._id}`,
    };
  } catch (error) {
    console.log("saving commit ", error);
    throw new Error("Unable to save the commit");
  }
};

export const generateSummary = async (fineMarkdown) => {
  const summary_result = await MindsDB.default.SQL.runQuery(`
  SELECT markdown, summary
  FROM mindsdb.githash_blog_summary
  WHERE markdown="${fineMarkdown}";
 `);
  console.log("summary result ", summary_result);
  return summary_result.rows[0]?.summary;
};
const generateOverview = async (fineMarkdown) => {
  const overview_result = await MindsDB.default.SQL.runQuery(`
  SELECT markdown, overview
  FROM mindsdb.githash_blog_overview
  WHERE markdown="${fineMarkdown}";
 `);
  console.log("Overview result ", overview_result);
  return overview_result.rows[0]?.overview;
};

export const removeMarkdownSyntax = (markdown) => {
  const regex = /(\r\n|\n|\r)/gm;
  const regex2 = /(\*\*|__)(.*?)\1/gm;
  const regex3 = /(\*|_)(.*?)\1/gm;
  const regex4 = /(\#)(.*?)\1/gm;
  const regex5 = /(\!\[)(.*?)(\]\()(.*?)(\))/gm;
  const regex6 = /(\[)(.*?)(\]\()(.*?)(\))/gm;
  const regex7 = /(\`)(.*?)(\`)/gm;
  const regex8 = /(\~\~)(.*?)(\~\~)/gm;
  const regex9 = /(<([^>]+)>)/gi;
  // remove double quotes
  const regex10 = /\"/gm;

  const result = markdown
    .replace(regex, "")
    .replace(regex2, "$2")
    .replace(regex3, "$2")
    .replace(regex4, "$2")
    .replace(regex5, "")
    .replace(regex6, "$2")
    .replace(regex7, "$2")
    .replace(regex8, "$2")
    .replace(regex9, "")
    .replace(regex10, "");

  return result;
};
