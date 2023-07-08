import { Button, SeoHead, Title } from '@/components/atoms';
import { useRouter } from 'next/router';
import React from 'react'

const RegisterPage = () => {
  const router = useRouter();
  
  const handleGoogleOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/google/login";
    router.push(oauthUrl);
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
    const oauthUrl = "/register/email";
    router.push(oauthUrl);
  }

  return (
    <section className="register__area">
      <SeoHead title='인터뷰뱅크 회원가입' />
      <Title title='회원가입' />
      <p className="register__type">
        회원가입 방식을 선택하세요.
      </p>
      <div className="btn__area">
        <Button value='Google로 회원가입' image='GOOGLE' onClickEvent={handleGoogleOauth}/>
        <Button value='KaKao로 회원가입' image='KAKAO' onClickEvent={handleKakaoOauth}/>
        <Button value='Naver로 회원가입' image='NAVER' onClickEvent={handleNaverOauth}/>
        <Button value='이메일로 회원가입' image='EMAIL' onClickEvent={handleEmailOauth}/>
      </div>
    </section>
  );
}

export default RegisterPage;