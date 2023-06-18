import React, {useState, useEffect} from "react";
import styled from "styled-components";

import MyPostComponent from "../../../Layout/MyPostList/MyPostComponent";
import Pagination from "../../../Components/Pagination/Pagination";

const MyPostView = ({ totalPosts, totalPages, limit, setPage, myPostParam, boardList, isLoading }) => {
  console.log(boardList)
  console.log(boardList.length)
  return (
      <MyPostLayout>
        <MyPostsContainer>
          <MyPostWrapper>
            <MyPostsBody>
            {!isLoading && boardList.length > 0 ? (
              <>
                <MyPostList>
                  {boardList.map((current) => (
                    <MyPostComponent
                      id={current.interviewId}
                      nickname={current.nickname}
                      createdAt={current.createdAt
                        .slice(0, 10)
                        .replaceAll("-", ".")}
                      title={current.title}
                      firstCategoryName={current.jobCategory.firstLevelName}
                      secondCategoryName={current.jobCategory.secondLevelName}
                    />
                  ))}
                </MyPostList>
                <PaginationWrapper>
                    {totalPages && 
                      <Pagination limit={limit} setPage={setPage} page={myPostParam.page} totalPosts={totalPosts} totalPages={totalPages} />
                    }
                </PaginationWrapper>
              </>
              ) : (
                !isLoading && <NoPost>작성한 게시글이 없습니다.</NoPost>
              )}
            </MyPostsBody>
          </MyPostWrapper>
        </MyPostsContainer>
      </MyPostLayout>
  );
};

const MyPostLayout = styled.div`
  display: flex; 
  width: 100%;
  min-height: 90vh; 
  justify-content: center; 

  margin : 0 auto;
  
`;
const MyPostsContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
 
`;

const MyPostWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
  width: 950px;
  max-width: 1100px;
`;

const MyPostsBody = styled.div`
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

const MyPostList = styled.div`
  position: relative;
  display: grid;
  width: 100%;

  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const NoPost = styled.div`
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

export default MyPostView;
