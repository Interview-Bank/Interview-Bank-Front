import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import { CardScrap } from "../Components/CardScrap";
// import Pagination from "../Components/Pagination";

const MyScrapView = ({
  scrapList,
  handlePageChange,
  limit,
  currentPage,
}) => {
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
        <ScrapPageFooter>
          {/* <Pagination
            limit={limit}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />{" "} */}
        </ScrapPageFooter>
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
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    border: 1px solid #2e55e7;
  }
`;
const CardBody = styled.div``;
const CardBodyTitle = styled.div`
  margin: 30px 0px 20px 35px;
  font-size: 1.1rem;
  font-weight: 700;
`;
// const CardBodyDate = styled.div`
//   font-size: 1rem;
// `;
// const CardBodyUser = styled.div`
//   font-size: 1rem;
// `;
export default MyScrapView;
