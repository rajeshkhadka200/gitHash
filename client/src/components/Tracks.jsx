import React, { useEffect, useState } from "react";
import "../css/tracks.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const Tracks = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [repo, setRepo] = useState();
  const [isnoRepo, setisnoRepo] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!token) return;
    const getRepo = async () => {
      try {
        setloading(true);
        const res = await axios.get(`${api_url}/user/getrepo/${token}`, {
          token: localStorage.getItem("token"),
        });
        if (res.status === 200) {
          setRepo(res.data.repo);
        }
        if (res.status === 204) {
          setisnoRepo(true);
        }
        setTimeout(() => {
          setloading(false);
        }, 300);
      } catch (error) {
        setloading(false);
        // toast.error("Unable to get the tracked repos.");
      }
    };
    getRepo();
  }, []);

  return (
    <>
      <div className="tracks_con">
        <h2>Blogs are published under these repo : 👇</h2>
        {loading ? (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <CircularProgress size={30} color="primary" />
          </div>
        ) : isnoRepo ? (
          <p className="no_repo_found">
            It seems you haven't tracked any repo yet.
          </p>
        ) : (
          repo?.map((item, index) => {
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
          })
        )}
      </div>
    </>
  );
};

export default Tracks;
