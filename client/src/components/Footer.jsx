import React from "react";
import "../css/footer.css";
const Footer = () => {
  return (
    <div className="foot_con">
      <div className={"left_side"}>
        GitHash.tech <span> © All right reserved</span>
      </div>
      <div className={"middle"}>
        Thanks to &nbsp;
        <a className={"outLinks"} target="_blank" href="https://hashnode.com/">
          Hashnode
        </a>
      </div>
      <div className={"right"}>
        Made with 💌 by &nbsp;
        <a
          className={"outLinks"}
          target="_blank"
          href="https://github.com/rajeshkhadka200"
        >
          Rajesh Khadka
        </a>
      </div>
    </div>
  );
};

export default Footer;
