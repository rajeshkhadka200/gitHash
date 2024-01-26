import React from "react";
import "../css/tracks.css";

const Tracks = () => {
  return (
    <>
      <div className="tracks_con">
        <h2>Blogs are published under these repo : 👇</h2>
        <div className="tracks_wrapper">
          <div className="single_actual_tracks">
            <div className="sn">1.</div>
            <div className="repo_name">apexa - the analyzer</div>

            <div className="branch">
              published : <span>main</span>{" "}
            </div>
            <div className="seeall">See details</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracks;
