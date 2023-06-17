import React from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";
import MypageSidemenuContanier from "../../../Components/MypageSidemenu/MypageSidemenuContanier";
import MyScrapComponent from "../../../Layout/MyScrapList/MyScrapComponent";
import Pagination from "../../../Components/Pagination/Pagination";

const MyScrapView = ({ totalPosts, totalPages, limit, setPage, scrapParam, scrapList, isLoading }) => {
  console.log(scrapList)
  return (
      <MyScrapLayout>
        <ScrapPageContainer>
          <MyScrapWrapper>
            <ScrapPageBody>
              {!isLoading && scrapList.length > 0 ? (
                <>
                  <ScrapList>
                    {scrapList.map((current) => (
                      <MyScrapComponent
                        key={current.scrapId}
                        id={current.scrapId}
                        nickname={current.nickname}
                        createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
                        title={current.title}
                        firstCategoryName={current.jobCategory.firstLevelName}
                        secondCategoryName={current.jobCategory.secondLevelName}
                      />
                    ))}
                  </ScrapList>
                  <PaginationWrapper>
                    {totalPages && 
                      <Pagination limit={limit} setPage={setPage} page={scrapParam.page} totalPosts={totalPosts} totalPages={totalPages} />
                    }
                  </PaginationWrapper>
                </>
                ) :(
                  !isLoading &&<NoScrap>작성한 답변글이 없습니다.</NoScrap>
                )}
            </ScrapPageBody>
          </MyScrapWrapper>
        </ScrapPageContainer>
      </MyScrapLayout>
  );
};

const MyScrapLayout = styled.div`
  display: flex; 
  width: 100%;
  min-height: 90vh; 
  justify-content: center; 

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
  width: 950px;
  max-width: 1100px;
`;


const ScrapPageBody = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto 20px;

  display: flex;
  flex-direction: column;

`;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;

`;

const ScrapList = styled.div`
  position: relative;
  display: grid;
  width: 100%;

  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const NoScrap = styled.div`
  position: absolute;
  display: flex;
  width: 954px;
  height: 326px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  justify-content: center;
  align-items: center;
  color: #ABABAB;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
`;

export default MyScrapView;
