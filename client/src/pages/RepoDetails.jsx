import React, { useEffect, useState } from "react";
import "../css/repodetails.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import axios from "axios";
const RepoDetails = () => {
  const location = useLocation();
  const { repoName, repoURL } = location.state || {};
  const api_url = import.meta.env.VITE_API_URL;
  const [commits, setCommits] = useState();

  console.log(commits);
  useEffect(() => {
    const getCommits = async () => {
      const res = await axios.post(
        `${api_url}/user/getcommit`,
        {
          repoURL: repoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCommits(res.data.commits);
    };
    getCommits();
  }, []);

  return (
    <>
      <div className="repo_details_con">
        <div className="repo_header">
          <h1>Repository : {repoName}</h1>
          <p>Blog published : {commits?.length}</p>
        </div>

        {commits?.map((item, index) => {
          const {
            blogId,
            blogURL,
            commitName,
            readTime,
            sha,
            blogImage,
            blogTitle,
            _id,
            token,
          } = item;
          return (
            <div className="specific_commit_with_blog">
              <div className="commit_header">
                <h3>
                  Commit : <span>{commitName}</span>
                </h3>
                <div className="branch">main</div>
                <div className="hastag"># {index}</div>
              </div>
              <div className="line"></div>
              <div className="blog_info_wrapper">
                <div className="single_blog">
                  <div className="sn_num">{index + 1}</div>
                  <div className="blog_img">
                    <img src={blogImage} alt="img_blog" />
                  </div>
                  <div className="tittle_blog">
                    {blogTitle.length > 50
                      ? blogTitle.slice(0, 50) + "..."
                      : blogTitle
                      ? blogTitle
                      : "No title"}
                  </div>
                  <a target="_blank" href={blogURL}>
                    <div className="arrow_blog">
                      <FaArrowRightLong />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RepoDetails;
