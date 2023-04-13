import React from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";
import MyScrapComponent from "../../../Layout/MyScrapList/MyScrapComponent";

const MyScrapView = ({ scrapList }) => {
  console.log(scrapList)
  const navigate = useNavigate();
  return (
    <Layout>
      <MyScrapLayout>
        <ScrapPageContainer>
          <MypageSidemenuContanier currentMenu = "MyScrap"/>
          <MyScrapWrapper>
            <ScrapPageTitle>
              작성한 답변글
            </ScrapPageTitle>
            <ScrapPageBody>
              {scrapList && 
                scrapList.map((current) => (
                <MyScrapComponent
                  id={current.interviewId}
                  nickname={current.nickname}
                  createdAt={""}
                  // createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
                  title={current.title}
                  firstCategoryName={""}
                  secondCategoryName={""}
                  // firstCategoryName={current.jobCategory.firstLevelName}
                  // secondCategoryName={current.jobCategory.secondLevelName}
                />
              ))}
            </ScrapPageBody>
          </MyScrapWrapper>
          {/* <ScrapPageFooter></ScrapPageFooter> */}
        </ScrapPageContainer>
      </MyScrapLayout>
    </Layout>
  );
};

const MyScrapLayout = styled.div`
  position: absolute;
  display: flex; 
  width: 100%;
  height: 750px;
  justify-content: center; 
  top : 50px;


  margin : 0 auto;
  
`;

const ScrapPageContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
`;

const MyScrapWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  width: 880px;
  max-width: 1100px;
`;

const ScrapPageTitle = styled.div`
  position: absolute;
  width: 160px;
  height: 35px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */


  color: #000000;
`;

const ScrapPageBody = styled.div`
  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 20px;
  margin-top: 50px;

  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

// const ScrapPageFooter = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;
//   margin-top: 50px;
// `;


export default MyScrapView;
