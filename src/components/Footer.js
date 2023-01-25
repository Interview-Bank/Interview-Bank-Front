import React from "react";
import "./ComponentsStyles/footer.css";
import Logo from "../images/logo2.svg";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Footer;
