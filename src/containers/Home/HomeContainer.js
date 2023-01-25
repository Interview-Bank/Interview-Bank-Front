import React from "react";
import Banner from "./Banner";
import "./homeContainer.css";

const HomeContainer = () => {
  return (
    <>
      <div className="home-container-wrapper">
        <div className="banner-box">
          <Banner />
        </div>
        <div className="contents-box-wrapper">
          <div className="home-contents-box">
            <div>
              <h1 className="contents-box-title">전체 글 보기</h1>
            </div>
            <div className="contents-box">
              <div className="box-container"></div>
              <div className="box-container"></div>
              <div className="box-container"></div>
              <div className="box-container"></div>
            </div>
            <div className="contents-box">
              <div className="box-container"></div>
              <div className="box-container"></div>
              <div className="box-container"></div>
              <div className="box-container"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
