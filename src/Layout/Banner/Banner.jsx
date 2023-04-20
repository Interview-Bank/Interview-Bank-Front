import React from "react";
import styled from "styled-components";
import BannerImg from "../../Assets/Images/banner.png";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerBody>
        <h1>
          대기업 면접 정보<br />
          인터뷰 뱅크에서!
        </h1>
        <h3>
          여러 기업들의 면접 정보를 한 눈에!
        </h3>
        <img src={BannerImg} alt="배너이미지" />
      </BannerBody>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  top: 100px;
  height: 380px;
  background-color: #2e55e7;
`;

const BannerBody = styled.div`
  width: calc(100% - 437px);
  max-width: 1100px;
  margin-left: 437px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-image: url("../../Assets/Images/banner.png");
  // justify-content: left;
  > h1 {
    width: 100%;
    margin-top: 83px;
    margin-bottom: 20px;
    color: #fff;
    line-height: 45px;
    text-align: left;
    z-index: 1;
  }
  > h3 {
    width: 100%;
    color: #fff;
    margin: 0;
    font-weight: 400;
    z-index: 1;
  }
  > img {
    position: absolute;
    z-index: 0;
  }
`;

export default Banner;
