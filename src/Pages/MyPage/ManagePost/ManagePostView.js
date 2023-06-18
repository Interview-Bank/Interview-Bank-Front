import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";

import React from 'react'
import MyPostContainer from "../MyPost/MyPostContainer";
import MyScrapContainer from "../MyScrap/MyScrapContainer";
import MySavedPostContainer from "../MySavedPost/MySavedPostContainer";
import MySavedScrapContainer from "../MySavedScrap/MySavedScrapContainer";

const ManagePostView = ({currentTap, setCurrnetTap, OnMypostClick}) => {
  return (
    <Layout>
        <ManagePostLayout>
            <ManagePostsContainer>
            <MypageSidemenuContanier currentMenu = "ManagePost"/>
                <ManagePostWrapper>
                    <ManagePostsTitle>
                        게시글 관리
                    </ManagePostsTitle>
                    <ManagePostTapWrapper>
                        <ManagePostTap 
                            onClick = {() => {setCurrnetTap("MyPost")}}
                            fontColor = {currentTap === "MyPost" ? "#2E55E7" : "#737373"} 
                            borderstyle = {currentTap === "MyPost" ? "3px solid #2E55E7" : ""}>
                            작성한 게시글
                        </ManagePostTap>
                        <ManagePostTap
                            onClick = {() => {setCurrnetTap("MyScrap")}}
                            fontColor = {currentTap === "MyScrap" ? "#2E55E7" : "#737373"} 
                            borderstyle = {currentTap === "MyScrap" ? "3px solid #2E55E7" : ""}>
                            작성한 답변글
                        </ManagePostTap>
                        <ManagePostTap
                            onClick = {() => {setCurrnetTap("MySavedPost")}}
                            fontColor = {currentTap === "MySavedPost" ? "#2E55E7" : "#737373"} 
                            borderstyle = {currentTap === "MySavedPost" ? "3px solid #2E55E7" : ""}>
                            임시저장한 게시글
                        </ManagePostTap>
                        <ManagePostTap
                            onClick = {() => {setCurrnetTap("MySavedScrap")}}
                            fontColor = {currentTap === "MySavedScrap" ? "#2E55E7" : "#737373"} 
                            borderstyle = {currentTap === "MySavedScrap" ? "3px solid #2E55E7" : ""}>
                            임시저장한 답변글
                        </ManagePostTap>
                    </ManagePostTapWrapper>
                    <DividingLine/>
                    <ContentsWrapper>
                        {currentTap === "MyPost" && <MyPostContainer/>}
                        {currentTap === "MyScrap" && <MyScrapContainer/>}
                        {currentTap === "MySavedPost" && <MySavedPostContainer />}
                        {currentTap === "MySavedScrap" && <MySavedScrapContainer/>}
                    </ContentsWrapper>
                </ManagePostWrapper>
            </ManagePostsContainer>
        </ManagePostLayout>
    </Layout>
  )
}
const ManagePostLayout = styled.div`
  display: flex; 
  width: 100%;
  min-height: 100vh; 
  justify-content: center; 
  top : 50px;


  margin : 0 auto;
  padding-top: 50px;
  
`;
const ManagePostsContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
 
`;

const ManagePostWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  width: 950px;
  max-width: 1100px;
`;

const ManagePostsTitle = styled.div`
  position: relative;
  width: 160px;
  height: 35px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;


  color: #000000;
`;

const ManagePostTapWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    width: 567px;
    height: 23px;

    margin-top: 24px;

`;
const ManagePostTap = styled.div`
    width: fit-content;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: ${props => props.fontColor};
    border-bottom: ${props => props.borderstyle} ;

    padding-bottom: 8px;

    cursor: pointer;

    :hover{
        color : #2E55E7;
        border-bottom: 3px solid #2E55E7;
    }

`;

const DividingLine = styled.div`
    width : 100vh;

    height : 1px;
    background-color: #D9D9D9;

    margin-top: 10px;
`;

const ContentsWrapper = styled.div`
    margin-top: 16px;
`;
export default ManagePostView