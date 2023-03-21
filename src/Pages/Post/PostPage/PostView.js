import axios from "axios";
import React from "react";
import Layout from "../../../Layout/Layout";
import CreateQuestionsContainer from "../CreateQuestions/CreateQuestionsContainer";
import QuestionList from "../QuestionsList/QuestionList";
import styled from "styled-components";
import EmptyInterviewTitleModalContainer from "../../../Components/ModalContent/EmptyInterviewTitleModal/EmptyInterviewTitleModalContainer";
import EmptyInterviewTitleModal from "../../../Components/Modal/PopUpModal"
const PostView = ({
  setTitle,
  handleClickSubmit,
  onChange,
  onCreate,
  content,
  questions,
  onRemove,
  questionsId,
  emptyInterviewTitleModal,
  setEmptyInterviewTitleModal,
  onAddInput

}) => {
  return (
    <Layout>
      <WriteTitle>
        <Input
          placeholder="제목을 입력해주세요."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </WriteTitle>
      <WriteBody>
        <QuestionList
          questions={questions}
          questionsId={questionsId}
          onRemove={onRemove}
          onCreate={onCreate}
          onChange={onChange}
          onAddInput={onAddInput}
        />
        <CreateQuestionsContainer
          content={content}
          questionsId={questionsId}
          onCreate={onCreate}
          onChange={onChange}
          onAddInput={onAddInput}
        />
        <AddButton onClick={onAddInput}>
          추가하기
        </AddButton>
        <PostButton onClick={handleClickSubmit}>발행하기</PostButton>
        {emptyInterviewTitleModal&&(
              <EmptyInterviewTitleModal
              CloseModal={() => {
                setEmptyInterviewTitleModal(!emptyInterviewTitleModal);
              }}>
                <EmptyInterviewTitleModalContainer/>
              </EmptyInterviewTitleModal>
          )}
      </WriteBody>
    </Layout>
  );
};
const AddButton = styled.button`
  width: 100%;
  height: 100px;
  margin-top: 30px;
  margin-bottom: 18px;
  border: none;
  background-color: #fff;
  font-weight: 700;
  color: #747474;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
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


const WriteTitle = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteBody = styled.div`
  display: flex;
  width: 96%;
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
`;

const Input = styled.input`
  border-top: 1px solid #b5b5b5;
  border-bottom: none;
  border-left: none;
  border-right: none;
  height: 40px;
  width: 1096px;
  padding-top: 20px;
  font-size: 28px;
  font-weight: 700;
  background-color: #f9f9f9;
  color: #252525;

  ::placeholder {
    font-size: 28px;
    color: #747474;
  }
  :focus {
    outline: none;
  }
`;

const PostButton = styled.button`
  border-radius: 30px;
  border: none;
  width: 150px;
  height: 50px;
  margin-top: 100px;
  margin-bottom: 30px;
  background-color: #2e55e7;
  color: #fff;
  justify-content: end;
`;

export default PostView;