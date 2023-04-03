import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerBody>
        <h1>
          대기업 면접 정보 궁금하다면? <br />
          인터뷰 뱅크에서!
        </h1>
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
  width: 96%;
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  > h1 {
    margin-top: 70px;
    color: aliceblue;
    line-height: 45px;
  }
`;

export default Banner;
