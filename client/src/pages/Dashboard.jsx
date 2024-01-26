import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import Tracks from "../components/Tracks";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      console.log("No user found");
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="dash_con">
        <div className="token_viewer">
          <div className="heading">
            <h2>Your Api Token</h2>
            <p>
              Copy the provided API token and, when inserting it into the
              secrets of the specified GitHub repository, label it as
              <b>"Authorization"</b> to enable secure tracking and integration.
            </p>
          </div>
          <div className="input_box">
            <input type="text" disabled value={"jpv1h1ilmq17yjay"} />
            <button>Copy Token</button>
          </div>
        </div>
      </div>

      {/* tracks */}
      <Tracks />
    </>
  );
};

export default Dashboard;
