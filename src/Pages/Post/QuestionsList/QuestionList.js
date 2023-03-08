import React from "react";
import styled from "styled-components";

const Question = ({ question, onRemove }) => {
  const { content, questionsId } = question;
  return (
    <Questions>
      {content}
      <RemoveButton
        onClick={() => {
          onRemove(questionsId);
        }}
      >
        ✕
      </RemoveButton>
    </Questions>
  );
};

const QuestionList = ({ questions, onRemove, questionsId }) => {
  return (
    <QuestionsList>
      {questions.map((question) => (
        <Question
          question={question}
          questionsId={questionsId}
          onRemove={onRemove}
        />
      ))}
    </QuestionsList>
  );
};

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RemoveButton = styled.button`
  border: none;
  background-color: #fff;
  color: #b5b5b5;
  font-size: 1.1rem;
  :hover {
    color: red;
    cursor: pointer;
  }
`;

const Questions = styled.div`
  width: 988px;
  height: 80px;
  margin-bottom: 5px;
  margin-top: 20px;
  border: none;
  border-left: 12px solid #2e55e7;
  background-color: #fff;
  font-weight: 700;
  color: #252525;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 50px;
  outline: none;
  justify-content: space-between;

  transition: all 0.3s ease-in-out;
`;

export default QuestionList;
