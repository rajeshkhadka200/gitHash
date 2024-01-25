import React from "react";
import "../css/home.css";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <div className="home_container">
        <h2>
          Code to Blog: Effortless GitHub Updates on Hashnode <br />
          <span> with GitHash</span>
        </h2>
        <p>
          Elevate your commits with GitHash! Effortlessly sync GitHub changes to
          Hashnode for concise and impactful updates.
        </p>
        <button>View on GitHub</button>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
