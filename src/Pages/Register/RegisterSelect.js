import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import GoogleIconUrl from "../../Assets/Images/google.png"
import KakaoIconUrl from "../../Assets/Images/kakaotalk.png"
import NaverIconUrl from "../../Assets/Images/naver.png"
import EmailIconUrl from "../../Assets/Icons/EmailIcon.png"
const RegisterSelect = () => {
  const navigate = useNavigate();
  const AccountOauthBaseUrl = process.env.REACT_APP_API_ACCOUNT_OAUTH_BASE_URL
  const handleGoogleOauth = () => {
    const oauthUrl = `${AccountOauthBaseUrl}/google/login`;
    window.location.assign(oauthUrl);
  };
  
  const handleKakaoOauth = () => {
    const oauthUrl = `${AccountOauthBaseUrl}/kakao/login`;
    window.location.assign(oauthUrl);
  };
  const handleNaverOauth = () => {
    const oauthUrl = `${AccountOauthBaseUrl}/naver/login`;
    window.location.assign(oauthUrl);
  };
  return (
    <Layout>
      <SelectionWrapper>
        <RegisterTitle>회원가입</RegisterTitle>
        <RegisterDesc>회원가입 방식을 선택하세요.</RegisterDesc>
        <SelectButtonWrapper>
          <SelectButton
            onClick={handleGoogleOauth}
          >
            <SocialIcon src = {GoogleIconUrl}/>
            Google로 회원가입
          </SelectButton>

          <SelectButton
            onClick={handleKakaoOauth}
          >
            <SocialIcon src = {KakaoIconUrl}/>
            KaKao로 회원가입
          </SelectButton>

          <SelectButton
            onClick={handleNaverOauth}
          >
            <SocialIcon src = {NaverIconUrl}/>
            Naver로 회원가입
          </SelectButton>

          <SelectButton
            onClick={() => {
              navigate("/signup");
            }}
          >
            <EmailIcon src = {EmailIconUrl} />
            이메일로 회원가입
          </SelectButton>
        </SelectButtonWrapper>
      </SelectionWrapper>
    </Layout>
  );
};

const SelectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  padding-top: 80px;
  margin: 0px auto;


`;
const RegisterTitle = styled.div`
  position: relative;
  width: 100px;
  height: 35px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #2E55E7;

  margin: 0px auto;
  margin-bottom: 18px;
`;

const RegisterDesc = styled.div`
  position: relative;
  width: 220px;
  height: 21px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #646464;

  margin: 0px auto;
  margin-bottom: 52px;
`;

const SelectButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SelectButton = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  
  align-items: center;

  width: 350px;
  height: 60px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;

  color: #646464;

  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  margin-bottom: 12px;

  :hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
    color: #2e55e7;
  }
`;

const SocialIcon = styled.img`
  position: relative;
  width: 32px;
  height: 32px;

  margin-left: 30px;
  margin-right: 59px;
`;

const EmailIcon  = styled.img`
  position: relative;
  width: 36px;
  height: 36px;

  margin-left: 28px;
  margin-right: 57px;
`;

export default RegisterSelect;
