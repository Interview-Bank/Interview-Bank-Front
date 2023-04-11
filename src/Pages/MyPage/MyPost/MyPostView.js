import React from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";
import MyPostComponent from "../../../Layout/MyPostList/MyPostComponent";

const MyPostView = ({ boardList }) => {
  const navigate = useNavigate();
  console.log(boardList)
  return (
    <Layout>
      <MyPostLayout>
        <MyPostsContainer>
          <MypageSidemenuContanier currentMenu = "MyPost"/>
          <MyPostWrapper>
            <MyPostsTitle>
              작성한 게시글
            </MyPostsTitle>
            <MyPostsBody>
              {boardList &&
                boardList.map((current) => (
                  <MyPostComponent
                  id={current.interviewId}
                  nickname={current.nickname}
                  createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
                  title={current.title}
                  firstCategoryName={current.jobCategory.firstLevelName}
                  secondCategoryName={current.jobCategory.secondLevelName}
                />
              ))}
            </MyPostsBody>
          </MyPostWrapper>
        </MyPostsContainer>
      </MyPostLayout>
    </Layout>
  );
};

const MyPostLayout = styled.div`
  position: absolute;
  display: flex; 
  width: 100%;
  height: 750px;
  justify-content: center; 
  top : 50px;
  left : 40px;
  
`;
const MyPostsContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
  margin-left: 130px;
`;

const MyPostWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 950px;
  max-width: 1100px;
`;

const MyPostsTitle = styled.div`
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

const MyPostsBody = styled.div`
  margin-top: 50px;
  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;


export default MyPostView;
