import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./ComponentsStyles/layout.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="main-container">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
