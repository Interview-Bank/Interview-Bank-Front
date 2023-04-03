import React from "react";
import moment from "moment";
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import Banner from "../../Layout/Banner/Banner";
import HomeSearch from './HomeSearch';
import PostComponet from '../../Layout/PostList/PostComponent';

const HomeView = ({ interviewList, navigate }) => {
  return (
    <Layout>
      <Banner />
      <HomeSearch />
      <HomeWrapper>
        <HomeTitle>
          <h2>최신 글 보기</h2>
        </HomeTitle>
        <PostComponet>
          
        </PostComponet>
        <HomeBody>
          {interviewList &&
            interviewList.slice(0,10).map((item, index) => (
              <ul
                key={item.interviewId}
                onClick={(e) => {
                  navigate(`/interview/${item.interviewId}`);
                }}
              >
                <CardTitle>{item.title}</CardTitle>
                <CardDetail>
                  <CardNickname>{item.nickname}</CardNickname>
                  <CardDate>
                    {moment(item.createdAt).add(9, "hour").format("YYYY.MM.DD")}
                  </CardDate>
                </CardDetail>
              </ul>
            ))}
        </HomeBody>
        <HomeFooter></HomeFooter>
      </HomeWrapper>
    </Layout>
  );
};

const HomeWrapper = styled.div`
  min-height: 70vh;
  width: 96%;
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 150px;
`;

const HomeTitle = styled.div`
  width: 96%;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 40px;
`;

const HomeBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > ul {
    padding: 15px 30px;
    width: 510px;
    height: 150px;
    margin-bottom: 10px;
    border: none;
    background-color: #fff;
    font-weight: 700;
    color: #252525;
    font-size: 0.9rem;
    display: flex;
    justify-content: start;
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
  }
`;
const HomeFooter = styled.div``;

const CardTitle = styled.span`
  font-size: 1.4rem;
  color: #252525;
  margin-top: 30px;
  margin-left: 30px;
  margin: 0 auto;
  margin-left: 30px;
  margin-top: 30px;
`;

const CardDetail = styled.div`
  display: flex;
  gap: 15px;
`;
const CardNickname = styled.span`
  display: flex;
  align-items: flex-end;
  color: #747474;
`;
const CardDate = styled.div`
  display: flex;
  align-items: flex-end;
  color: #747474;
`;

export default HomeView;
