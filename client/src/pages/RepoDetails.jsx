import React, { useEffect, useState } from "react";
import "../css/repodetails.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
const RepoDetails = () => {
  const location = useLocation();
  const { repoName, repoURL } = location.state || {};
  const api_url = import.meta.env.VITE_API_URL;
  const [commits, setCommits] = useState();
  const [isnoCommits, setisnoCommits] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getCommits = async () => {
      setloading(true);
      try {
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
        if (res.status === 200) {
          setCommits(res.data.commits);
        }

        if (res.status === 204) {
          setisnoCommits(true);
        }
        setTimeout(() => {
          setloading(false);
        }, 200);
      } catch (error) {
        setloading(false);
        // toast.error("Unable to get the commits.");
      }
    };
    getCommits();
  }, []);

  return (
    <>
      <div className="repo_details_con">
        <div className="repo_header">
          <h1>Repository : {repoName}</h1>
          <p>Blog published : {commits?.length || 0}</p>
        </div>
        {loading ? (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <CircularProgress size={30} color="primary" />
          </div>
        ) : isnoCommits ? (
          "No commits found under repos."
        ) : (
          commits?.map((item, index, array) => {
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
            const reversedIndex = array.length - index;
            return (
              <div className="specific_commit_with_blog">
                <div className="commit_header">
                  <h3>
                    Commit : <span>{commitName}</span>
                  </h3>
                  <div className="branch">main</div>
                  <div className="hastag">#{reversedIndex}</div>
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
          })
        )}
      </div>
    </>
  );
};

export default RepoDetails;
