import React from "react";
import styled from "styled-components";
import moment from "moment";
import Layout from "../../Layout/Layout";

const ScrapInterviewView = ({
   title, 
   board, 
   navigate, 
   boardId, 
   contents, 
   answers, 
   setAnswers, 
   inputValues, 
   toggleAnswerInput, 
   handleInputChange, 
   handleWrapperClick, 
   handleInputLimit,
   handleScrapAnswer,
   inputRefs }) => {
    console.log(contents)
  return (
    <Layout>
      <BoardWrapper>
        <BoardBody>
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
              <StyledLi key={index} onClick={() => toggleAnswerInput(index)}>
                <div className="content">{item.content}</div>
                {answers[index] && (
                  <InputWrapper onClick={handleWrapperClick}>
                    <DividignLine></DividignLine>

                    <StyledInput
                      ref={(el) => (inputRefs.current[index] = el)}
                      placeholder="답변을 입력해주세요."
                      value={inputValues[index]}
                      onChange={(e) => handleInputChange(index, e)}
                      onInput={(e) => handleInputLimit(e)}
                    />
                  </InputWrapper>
                )}
              </StyledLi>
            ))}
          </QuestionsBlock>
          <SaveBtn onClick={handleScrapAnswer}>저장</SaveBtn>

        </BoardBody>
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
const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
`
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

const QuestionsBlock = styled.div`
  position: relative;

  margin-top : 66px;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;

  width: 1047px;
  min-height: 100px;

  font-weight: 700;
  font-size: 18px;

  padding-left: 66px;
  border-radius: 5px;
  border: 0px solid #b5b5b5;
  border-left: 17px solid #2e55e7;
  outline: none;

  background-color: #fff;
  margin-bottom: 12px;

  .content {
    align-self: flex-start;
    padding-top: 32px;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  height: auto;
  margin-bottom: 20px;

`;
const DividignLine = styled.div`
  width: 98%;
  height : 0px;
  border: 1px solid #D9D9D9;

  margin-top : 32px;

`;
const StyledInput = styled.textarea`
  width: 95%;
  max-height: 300px;
  border: none;
  outline: none;
  resize: none;
  overflow : auto;

  box-sizing: border-box;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #000000;

  &::-webkit-scrollbar {
    height: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cf0606;
    border-radius: 3px;
  }

  margin-top : 20px;

`;

const SaveBtn = styled.button`
  position: relative;
  width: 80px;
  height: 35px;
  cursor: pointer;

  border: none;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
  background-color: #2E55E7;

  z-index: 2;

  margin-top : 38px;
  margin-bottom : 50px;
  margin-left: auto;
`;

export default ScrapInterviewView;
