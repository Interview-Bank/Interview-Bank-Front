import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";

const FindPasswordView = () => {
  return (
    <>
      <Layout>
        <FindPasswordContainer>
          <h1>비밀번호 찾기</h1>
          <p>
            비밀번호를 잃어버리셨나요? 인터뷰 뱅크에 가입한 이메일을 입력해
            주세요. 이메일을 통해 비밀번호 변경 링크가 전송됩니다.
          </p>
          <Input placeholder="이메일을 입력해주세요." />
          <Button>이메일 전송하기</Button>
        </FindPasswordContainer>
      </Layout>
    </>
  );
};

const FindPasswordContainer = styled.div`
  margin: 64px auto auto;
  width: 346px;
  height: 676px;
  min-height: 100vh;
  > h1 {
    font-weight: 700;
    text-align: center;
    color: #2e55e7;
    margin-top: 100px;
  }
  > p {
    font-weight: 600;
    text-align: center;
    color: #737373;
    font-size: 14px;
  }
`;
const Input = styled.input`
  width: 319px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  margin-top: 30px;
  padding-left: 15px;
  ::placeholder {
    color: #b5b5b5;
  }
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: 700;
  width: 338px;
  height: 52px;
  border-radius: 5px;
  padding: 15px 8px;
  background-color: #2e55e7;
  color: #fff;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`;

export default FindPasswordView;
