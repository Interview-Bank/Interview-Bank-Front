import React from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";

const MyPostView = ({ boardList }) => {
  const navigate = useNavigate();
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
              {boardList.map((item, index) => (
                <CardWrapper
                  key={index}
                  onClick={() => {
                    navigate(`/interview/${item.interviewId}`);
                  }}
                >
                  <CardBody>
                    <CardBodyTitle>{item.title}</CardBodyTitle>
                    <CardBodyDetail>
                      <CardBodyDate>
                        {moment(item.createdAt).add(9, "hour").format("YYYY.MM.DD")}
                      </CardBodyDate>
                      <CardBodyUser>{item.nickname}</CardBodyUser>
                    </CardBodyDetail>
                  </CardBody>
                </CardWrapper>
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
  width: 200px;
  height: 39px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;

  text-align: center;

  color: #2E55E7;
`;

const MyPostsBody = styled.div`
  margin-top: 30px;
`;

const CardWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 15px 30px;
  height: 60px;
  margin-bottom: 10px;
  border: none;
  background-color: #fff;
  font-weight: 700;
  color: #252525;
  font-size: 0.9rem;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  :hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
    color: #2e55e7;
  }
`;
const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
const CardBodyTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
`;
const CardBodyDate = styled.div`
  font-size: 1rem;
`;
const CardBodyUser = styled.div`
  font-size: 1rem;
`;

const CardBodyDetail = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;
export default MyPostView;
