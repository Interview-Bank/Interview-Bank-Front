import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";

const MyScrapView = ({ scrapList }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <ScrapPageContainer>
        <ScrapPageTitle>
          <h2>스크랩한 게시글</h2>
        </ScrapPageTitle>
        <ScrapPageBody>
          {scrapList.map((item, index) => (
            <CardWrapper
              key={index}
              onClick={() => {
                navigate(`/scraps/${item.scrapId}`);
              }}
            >
              <CardBody>
                <CardBodyTitle>{item.title}</CardBodyTitle>
              </CardBody>
            </CardWrapper>
          ))}
        </ScrapPageBody>
        <ScrapPageFooter></ScrapPageFooter>
      </ScrapPageContainer>
    </Layout>
  );
};

const ScrapPageContainer = styled.div`
  min-height: 100vh;
  width: 96%;
  max-width: 1100px;
  margin: 0 auto;
`;

const ScrapPageTitle = styled.div`
  margin-top: 70px;
  width: 1100px;
  > h2 {
    margin: 0;
    padding-left: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #b5b5b5;
  }
`;

const ScrapPageBody = styled.div`
  margin-top: 30px;
`;

const ScrapPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
`;

const CardWrapper = styled.div`
  justify-content: space-between;
  padding: 15px 30px;
  height: 60px;
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
`;
const CardBody = styled.div``;
const CardBodyTitle = styled.div`
  margin: 30px 0px 20px 35px;
  font-size: 1.1rem;
  font-weight: 700;
`;

export default MyScrapView;
