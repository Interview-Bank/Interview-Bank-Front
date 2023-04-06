import React from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";

const MyScrapView = ({ scrapList }) => {
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
  left : 40px;
  
`;

const ScrapPageContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
  margin-left: 130px;
`;

const MyScrapWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 950px;
  max-width: 1100px;
`;

const ScrapPageTitle = styled.div`
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

const ScrapPageBody = styled.div`
  margin-top: 30px;
`;

// const ScrapPageFooter = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;
//   margin-top: 50px;
// `;

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
const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
const CardBodyTitle = styled.div`
  margin: 30px 0px 20px 35px;
  font-size: 1.1rem;
  font-weight: 700;
`;

export default MyScrapView;
