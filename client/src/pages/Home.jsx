import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/home.css";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <div className="home_container">
        <h2>
          Code to Blog: Effortless GitHub Updates on Hashnode <br />
          <span> with GitHash </span> 💻🚀
        </h2>
        <p>
          Elevate your commits with GitHash! Effortlessly sync GitHub changes to
          Hashnode for concise and impactful updates.
        </p>
        <a target="_blank" href="https://github.com/rajeshkhadka200/gitHash">
          <button>View on GitHub</button>
        </a>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
