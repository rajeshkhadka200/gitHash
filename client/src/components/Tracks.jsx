import React, { useEffect, useState } from "react";
import "../css/tracks.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Tracks = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [repo, setRepo] = useState();

  useEffect(() => {
    if (!token) return;
    const getRepo = async () => {
      const res = await axios.get(`${api_url}/user/getrepo/${token}`, {
        token: localStorage.getItem("token"),
      });
      setRepo(res.data.repo);
    };
    getRepo();
  }, []);

  return (
    <>
      <div className="tracks_con">
        <h2>Blogs are published under these repo : 👇</h2>
        {repo?.map((item, index) => {
          const { repoName, repoURL, _id } = item;
          console.log(repoName);
          return (
            <div className="tracks_wrapper">
              <div className="single_actual_tracks">
                <div className="sn">{index + 1}</div>
                <div className="repo_name">{repoName}</div>

                <div className="branch">
                  published : <span>main</span>
                </div>
                <NavLink
                  to={`/repo/details/${_id}`}
                  state={{ repoName: repoName, repoURL: repoURL }}
                >
                  <div className="seeall">See details</div>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tracks;
