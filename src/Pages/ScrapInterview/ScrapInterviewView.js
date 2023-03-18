import React from "react";
import styled from "styled-components";
import moment from "moment";
import Layout from "../../Layout/Layout";

const ScrapInterviewView = ({ title, board, navigate, boardId, contents }) => {
  return (
    <Layout>
      <BoardWrapper>
        <div className="board-body">
          <BoardTitle>{title}</BoardTitle>
          <BoardDetail>
            <BoardDate>
              {moment(board.created).add(9, "hour").format("YYYY-MM-DD")}
              <GoToPost
                onClick={(e) => {
                  navigate(`/interview/${boardId}`);
                }}
              >
                원본 글로 이동하기
              </GoToPost>
            </BoardDate>
          </BoardDetail>
          <QuestionsBlock>
            {contents.map((item, index) => (
              <div key={index}>
                <li>
                  {item.content}
                  <AddAnswerButton>+</AddAnswerButton>
                </li>
              </div>
            ))}
          </QuestionsBlock>
        </div>
      </BoardWrapper>
    </Layout>
  );
};
const BoardWrapper = styled.div`
  min-height: 100vh;
  width: 96%;
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
`;

const BoardTitle = styled.div`
  border-bottom: 1px solid #b5b5b5;
  border-top: none;
  border-left: none;
  border-right: none;
  height: 40px;
  width: 1096px;
  padding-top: 20px;
  font-size: 28px;
  font-weight: 700;
  background-color: #f9f9f9;
  font-weight: 700;
  margin-top: 60px;
  display: flex;
`;

const BoardDetail = styled.div`
  margin-top: 30px;
  font-weight: 700;
  display: flex;
  width: 96%;
  max-width: 1100px;
`;

const BoardDate = styled.div`
  color: #747474;
  font-weight: 700;
`;

const GoToPost = styled.button`
  border: none;
  font-weight: 700;
  color: #747474;
  cursor: pointer;
  background-color: #f9f9f9;
  right: 0;
  justify-content: end;
`;
const AddAnswerButton = styled.button`
  border: none;
  font-weight: 400;
  color: #747474;
  cursor: pointer;
  background-color: #fff;
  font-size: 1.3rem;
  margin-right: 20px;
  :hover {
    color: #2e55e7;
  }
`;

const QuestionsBlock = styled.div`
  > div > li {
    font-weight: 700;
    font-size: 18px;
    width: 1047px;
    height: 100px;
    padding-left: 30px;
    margin-top: 30px;
    border-radius: 5px;
    border: 0px solid #b5b5b5;
    border-left: 17px solid #2e55e7;
    outline: none;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
    align-items: center;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
  }
`;

export default ScrapInterviewView;
