import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import Tracks from "../components/Tracks";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import SetupHashnode from "../components/SetupHashnode";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      console.log("No user found");
      navigate("/");
    }
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${api_url}/user/getuser/${userId}`);
      setUser(res.data.user);
    };
    getProfile();
  }, []);
  function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("API key copied!");
  }

  return (
    <>
      <div className="dash_con">
        <div className="token_viewer">
          <div className="heading">
            <h2>Your GitHash Api Token 📶</h2>
            <p>
              Copy the provided API token and, when inserting it into the
              secrets of the specified GitHub repository, label it as
              <b>"GitHash"</b> to enable secure tracking and integration.
            </p>
          </div>
          <div className="input_box">
            <input type="text" disabled value={user?.token} />
            <button
              onClick={() => {
                copyToClipboard(user.token);
              }}
            >
              Copy Token
            </button>
          </div>
        </div>
      </div>
      {/* tracks */}
      <SetupHashnode />
      <NavLink to="/repo">
        <div className="right_arrow">
          <FaArrowRight size={20} />
        </div>
      </NavLink>
      {/* <Tracks /> */}
    </>
  );
};

export default Dashboard;
