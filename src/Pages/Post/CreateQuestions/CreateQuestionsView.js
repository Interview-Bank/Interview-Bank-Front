import React, { useState } from "react";
import styled from "styled-components";

const CreateQuestions = ({ content, onCreate, onChange, isOpen, onToggle, onAddInput, handleKeyDown }) => {
  console.log(content)
  return (
    <>
      {isOpen && (
        <InsertForm>
          <Block>
            <Input
              name="content"
              onChange={onChange}
              value={content}
              placeholder="인터뷰를 입력해주세요."
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </Block>
        </InsertForm>
      )}
    </>
  );
};

// const AddButton = styled.button`
//   width: 100%;
//   height: 100px;
//   margin-top: 30px;
//   margin-bottom: 18px;
//   border: none;
//   background-color: #fff;
//   font-weight: 700;
//   color: #747474;
//   font-size: 0.9rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;
//   border-radius: 8px;
//   box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
//   padding: 10px 10px;
//   cursor: pointer;
//   transition: box-shadow 0.3s ease-in-out;
//   :hover {
//     box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
//     color: #2e55e7;
//   }
// `;

const InsertForm = styled.div`
  display: flex;
  position: relative;
`;

const Input = styled.input`
  width: 984px;
  height: 80px;
  margin-bottom: 15px;
  margin-top: 30px;
  border: none;
  border-left: 16px solid #2e55e7;
  background-color: #fff;
  font-weight: 700;
  color: #252525;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 50px;
  outline: none;
`;

// const QuestionsAddButton = styled.button`
//   position: absolute;
//   top: 75px;
//   right: 20px;
//   justify-content: center;
//   border: none;
//   background-color: #2e55e7;
//   color: #fff;
//   cursor: pointer;
//   border-radius: 5px;
//   width: 80px;
//   height: 30px;
//   margin-right: 30px;
//   font-size: 0.9rem;
//   font-weight: 700;
//   outline: none;
// `;

const Block = styled.div`
  justify-content: space-between;
`;

export default CreateQuestions;