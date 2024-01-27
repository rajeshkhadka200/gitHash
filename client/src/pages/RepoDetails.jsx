import React from "react";
import "../css/repodetails.css";
import { FaArrowRightLong } from "react-icons/fa6";

const RepoDetails = () => {
  return (
    <>
      <div className="repo_details_con">
        <div className="repo_header">
          <h1>Repository : apexa</h1>
          <p>Blog published : 3</p>
        </div>

        <div className="specific_commit_with_blog">
          <div className="commit_header">
            <h3>
              Commit : <span>changed the server file.</span>
            </h3>
            <div className="branch">main</div>
            <div className="hastag">#1</div>
          </div>
          <div className="line"></div>
          <div className="blog_info_wrapper">
            <div className="single_blog">
              <div className="sn_num">1.</div>
              <div className="blog_img">
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1662798291554/V5fYEOF8p.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="img_blog"
                />
              </div>
              <div className="tittle_blog">
                Debugging Feb #1: How I Overcame a CORS Error when posting to
                Dev.to API.
              </div>
              <a target="_blank" href="https://blog.rajeshkhadka.info.np/">
                <div className="arrow_blog">
                  <FaArrowRightLong />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoDetails;
