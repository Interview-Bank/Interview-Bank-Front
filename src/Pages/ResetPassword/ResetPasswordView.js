import React from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";

const ResetPasswordView = ({
    pwdMsg, 
    confirmPwdMsg,
    onChangeConfirmPwd,
    onChangePwd,
    isPwdValid,
    isConfirmPwd,
    handleUpdatePassword
}) => {
  return (
    <>
      <Layout>
        <ResetPasswordContainer>
          <ResetPasswordTitle>비밀번호 재설정</ResetPasswordTitle>
          <ResetPasswordInputWrapper>
            <ResetPasswordInputTitle>
                새로운 비밀번호
            </ResetPasswordInputTitle>
            <PasswordInputWrapper>
                <NewPasswordInput 
                    type="password"
                    onChange={onChangePwd}
                    placeholder="영문자, 숫자, 특수문자 포함 최소 8자" />
                <ErrorMessage className={isPwdValid ? "success" : "error"}>
                {pwdMsg}
                </ErrorMessage>
            </PasswordInputWrapper>
            <PasswordInputWrapper>
                <CheckPasswordInput 
                    type="password"
                    onChange={onChangeConfirmPwd}
                    placeholder="비밀번호를 확인해주세요" />
                <ErrorMessage className={isConfirmPwd ? "success" : "error"}>
                {confirmPwdMsg}
                </ErrorMessage>
            </PasswordInputWrapper>
          </ResetPasswordInputWrapper>
          <ResetPasswordButton onClick = {handleUpdatePassword}>변경하기</ResetPasswordButton>
        </ResetPasswordContainer>
      </Layout>
    </>
  );
};

const ResetPasswordContainer = styled.div`
  margin: 64px auto auto;
  width: 350px;
  height: 676px;
  min-height: 100vh;

  margin: 0 auto;

  margin-top: 80px;
`;
const ResetPasswordTitle = styled.div`
    position: relative;
    width: 180px;
    height: 35px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;

    text-align: center;
    justify-self: center;
    color: #2E55E7;

    margin: 0 auto;
    margin-bottom: 52px;
`;
const ResetPasswordInputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    margin-bottom: 30px;
`;

const PasswordInputWrapper = styled.div`
    position: relative;

    margin-bottom: 12px;

`;
const ResetPasswordInputTitle = styled.div`
    position: relative;
    width: 120px;
    height: 23px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #737373;
    justify-self: left;

    margin-bottom: 8px;
`;
const NewPasswordInput = styled.input`
  width: 350px;
  height: 55px;
  border-radius: 5px;
  border: 1px solid #dee2e6;

  box-sizing: border-box;

  padding-left: 16px;
  margin-bottom: 12px;

  ::placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: left;

    color: #AAAAAA;
  }
`;

const CheckPasswordInput = styled.input`
  width: 350px;
  max-width: 350px;

  height: 55px;
  border-radius: 5px;
  border: 1px solid #dee2e6;

  box-sizing: border-box;

  padding-left: 16px;
  margin-bottom: 12px;

  ::placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: left;

    color: #AAAAAA;
  }
`;
const ResetPasswordButton = styled.button`
    width: 350px;
    height: 55px;

    border-radius: 8px;
    background: #2E55E7;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    align-self: center;
    justify-self: center;
    color: #FFFFFF;

    border: none;
    cursor: pointer;
`;
const ErrorMessage = styled.div`
  border: none;
  margin-left: 5px;
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
export default ResetPasswordView;
