import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MyPostsView = ({ boardList }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <MyPostsContainer>
        <MyPostsTitle>
          <h2>작성한 게시글</h2>
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
      </MyPostsContainer>
    </Layout>
  );
};

const MyPostsContainer = styled.div`
  min-height: 100vh;
  width: 96%;
  max-width: 1100px;
  margin: 0 auto;
`;

const MyPostsTitle = styled.div`
  width: 1100px;
  > h2 {
    margin: 0;
    padding-left: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #b5b5b5;
  }
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
export default MyPostsView;
