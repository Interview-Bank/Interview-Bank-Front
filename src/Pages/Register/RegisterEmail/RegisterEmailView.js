import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Layout from "../../../Layout/Layout";

const RegisterEmailView = ({
  nicknameMsg,
  emailMsg,
  pwdMsg,
  confirmPwdMsg,
  isAllValid,
  isNicknameValid,
  isEmailValid,
  isPwdValid,
  isConfirmPwd,
  onChangeConfirmPwd,
  onChangePwd,
  onChangeEmail,
  onChangeNickname,
  registerSubmit,
}) => {
  return (
    <Layout>
      <RegisterContainer>
        <RegisterHeader>
          <h1>Interview Bank</h1>
        </RegisterHeader>
        <RegisterBody>
          <div>
            <h4>닉네임</h4>
            <RegisterInput
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              onChange={onChangeNickname}
              autoComplete="off"
            />
            <OutputText className={isNicknameValid ? "success" : "error"}>
              {nicknameMsg}
            </OutputText>
          </div>
          <div>
            <h4>이메일</h4>
            <RegisterInput
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeEmail}
              autoComplete="off"
            />
            <OutputText className={isEmailValid ? "success" : "error"}>
              {emailMsg}
            </OutputText>
          </div>
          <div>
            <h4>비밀번호</h4>
            <RegisterInput
              id="password"
              type="password"
              placeholder="영문,숫자,특수문자 포함 8자 이상"
              onChange={onChangePwd}
              autoComplete="off"
            />
            <OutputText className={isPwdValid ? "success" : "error"}>
              {pwdMsg}
            </OutputText>
          </div>
          <div>
            <RegisterInput
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              onChange={onChangeConfirmPwd}
              autoComplete="off"
            />
            <OutputText className={isConfirmPwd ? "success" : "error"}>
              {confirmPwdMsg}
            </OutputText>
          </div>
          <RegisterButton onClick={registerSubmit} disabled={!isAllValid}>
            회원가입
          </RegisterButton>
        </RegisterBody>
      </RegisterContainer>
    </Layout>
  );
};
const RegisterContainer = styled.div`
  margin-top: 100px;
  display: block;
  min-height: 100vh;
`;
const RegisterHeader = styled.div`
  font-weight: 700;
  text-align: center;
  color: #2e55e7;
  font-size: 14px;
`;
const RegisterBody = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
  > div {
    > h4 {
      margin-top: 25px;
      margin-bottom: 5px;
      color: #747474;
      font-size: 14px;
    }
  }
`;
const RegisterInput = styled.input`
  width: 319px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  padding-left: 15px;
  ::placeholder {
    color: #b5b5b5;
  }
`;
const RegisterButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  width: 338px;
  height: 52px;
  border-radius: 5px;
  padding: 15px 8px;
  background-color: #2e55e7;
  color: #fff;
  margin-top: 40px;
  border: none;
  cursor: pointer;
  :disabled {
    background-color: #737373;
  }
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

export default RegisterEmailView;
