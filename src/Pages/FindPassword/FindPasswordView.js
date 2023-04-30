import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";

const FindPasswordView = ({onChangeEmail, isEmailValid, emailMsg, handleEmailTransmit}) => {
  return (
    <>
      <Layout>
        <FindPasswordContainer>
          <FindPasswordTitle>비밀번호 찾기</FindPasswordTitle>
          <FindPasswordDesc>
            비밀번호를 잃어버리셨나요? 인터뷰 뱅크에 가입한 이메일을 입력해
            주세요. 이메일을 통해 비밀번호 변경 링크가 전송됩니다.
          </FindPasswordDesc>
          <Input 
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeEmail}
              autoComplete="off"/>
          <OutputText className={isEmailValid ? "success" : "error"}>
              {emailMsg}
          </OutputText>
          <Button
            onClick={handleEmailTransmit}>이메일 전송하기</Button>
        </FindPasswordContainer>
      </Layout>
    </>
  );
};

const FindPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: 676px;
  min-height: 100vh;


  margin: 0 auto;
  margin-top: 80px;
`;
const FindPasswordTitle = styled.div`
  position: relative;
  width: 160px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #2E55E7;

  margin-bottom: 18px;
`;

const FindPasswordDesc = styled.div`
  width: 396px;
  height: 116px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: center;

  color: #737373;

  margin-bottom: 60px;

`;
const Input = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 350px;
  height: 55px;

  background: #FFFFFF;
  border: 1px solid #2E55E7;
  border-radius: 8px;
  padding-left: 16px;

  margin-bottom: 12px;
  ::placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;

    color: #AAAAAA;
  }
`;
const Button = styled.button`
  width: 350px;
  height: 55px;
  border-radius: 8px;
  padding: 16px 8px;
  background-color: #2e55e7;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #fff;
  border: none;
  cursor: pointer;

`;

const OutputText = styled.div`
  border: none;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-align: start;
  &.success {
    color: #2e55e7;
    display: none;
  }
  &.error {
    color: red;

    display: block;
  }
`;

export default FindPasswordView;
