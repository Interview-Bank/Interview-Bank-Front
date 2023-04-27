import { RegisterButtonType } from '@/components/molecules/RegisterButtonType';
import { useRouter } from 'next/router';
import React from 'react'

const RegisterPage = () => {
  const router = useRouter();
  const handleGoogleOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/google/login";
    router.push(oauthUrl);
    // window.location.assign(oauthUrl);
  };
  
  const handleKakaoOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/kakao/login";
    router.push(oauthUrl);
  };

  const handleNaverOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/naver/login";
    router.push(oauthUrl);
  };

  const handleEmailOauth = () => {
    const oauthUrl = "/signup";
    router.push(oauthUrl);
  }
  return (
    <section className="register__area">
      <h1>회원가입</h1>
      <p className="register__type">
        회원가입 방식을 선택하세요.
      </p>
      <div className="btn__area">
        <RegisterButtonType onClickEvent={handleGoogleOauth} icon={"GOOGLE"} content={"Google로 회원가입"} />
        <RegisterButtonType onClickEvent={handleKakaoOauth} icon={"KAKAO"} content={"KaKao로 회원가입"}/>
        <RegisterButtonType onClickEvent={handleNaverOauth} icon={"NAVER"} content={"Naver로 회원가입"}/>
        <RegisterButtonType onClickEvent={handleEmailOauth} icon={"EMAIL"} content={"이메일로 회원가입"} />
      </div>
    </section>
  );
}

export default RegisterPage;