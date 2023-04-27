import Image from 'next/image';
import React, { useState } from 'react'
import styles from './LoginModal.module.scss';
import Close from 'public/Icons/close.png';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/router';
import { isLogin } from '@/pages/api/login/loginProcess';

interface LoginModalProps {
  onClickEvent: () => void;
}

interface LoginModalRequestDataProps {
  email: string;
  password: string;
}

const LoginModal = ({ onClickEvent }: LoginModalProps) => {
  const router = useRouter();
  const defaultValue: LoginModalRequestDataProps = {
    email: "",
    password: "",
  }
  const [loginData, setLoginData] = useState({ ...defaultValue });
  const onChange = (field: string, value: string) => {
    setLoginData((prev) => { return {...prev, [field]: value}})
  }

  const isLoginSubmit = () => {
    isLogin(loginData);
  }
  // const API_URL = "https://bstaging.interviewbank.net/";

  // const [loginError, setLoginError] = useState({})
  // const loginSubmit = async (values) => {
  //   const { email, password } = values;
  //   try {
  //     await axios
  //       .post(API_URL + "account/login", {
  //         email,
  //         password,
  //       })
  //       .then((res) => {
  //         setCookieExpires('authToken', res.headers.get("X-Auth-Token"));
  //         setCookie('userId', res.data.accountId);
  //         setCookie('user', res.data.nickname);
  //         setLoginError({})
  //         if ((window.location.pathname === '/select' || window.location.pathname === '/signup')) navigate('/');
  //         else window.location.reload();
  //       });
  //   } catch (e) {
  //     setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
  //   }
  // };
  const linkRegisterPage = () => {
    router.push("/register");
    onClickEvent()
  }

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

  return (
    <div className={styles.login__area}>
      <div className={styles.background}></div>
      <div className={styles.whiteground}>
        <Image src={Close} alt="닫기 버튼" width={24} height={24} onClick={()=>onClickEvent()} />
        <h2>Interview Bank</h2>
        <div className={styles.login__input}>
          <input type="text"
            value={loginData.email}
            name="email"            
            onChange={(e)=>onChange("email", e.target.value)}
            placeholder="이메일"
          />
          <input
            type="password"
            value={loginData.password}
            name="password"
            onChange={(e)=>onChange("password", e.target.value)}
            placeholder="비밀번호"
          />
          <Button width='100' height='45px' backgroundColor='blue' value='로그인' color='white' onClickEvent={isLoginSubmit} />
        </div>
        <div className={styles.find__area}>
          <span onClick={() => linkRegisterPage()} >
            회원가입
          </span>
          <div></div>
          <span onClick={() => router.push("/find")} >
            비밀번호 찾기
          </span>
        </div>
        <div className={styles.social}>
          <div className={styles.title}>
            다른 계정으로 로그인
          </div>
          <div className={styles.btn__area}>
            <Button onClickEvent={handleKakaoOauth} image={"KAKAO"} width='50px' height='50px' value=''/>
            <Button onClickEvent={handleGoogleOauth} image={"GOOGLE"} width='50px' height='50px' value=''/>
            <Button onClickEvent={handleNaverOauth} image={"NAVER"} width='50px' height='50px' value=''/>
          </div>
        </div>
      </div>
    {/* 
      {({ values, handleSubmit, handleChange }) => (
        <LoginWrapper>
          <LoginTitle>Interview Bank</LoginTitle>
          <form onSubmit={handleSubmit} autoComplete="off">
            
              {loginError.errorMessage && 
                <ErrorMessageWrapper>
                  <AlertIcon src = {AlertIconUrl}/>
                  <ErrorMessage>
                    {loginError.errorMessage}
                  </ErrorMessage>
                </ErrorMessageWrapper>
              }
              <LoginButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                error={loginError.errorMessage}
              >
                로그인
              </LoginButton>
            </InputFromWrapper>
          </form>
          <AdditionalBox>
            <span
              onClick={() => {
                navigate("/select");
              }}
            >
              회원가입
            </span>
            <div></div>
            <span
              onClick={() => {
                navigate("/find");
              }}
            >
              비밀번호 찾기
            </span>
          </AdditionalBox>
          <SocialLoginBox>
            <SocialLoginTitle>다른 계정으로 로그인</SocialLoginTitle>
            <SocialLoginButtonWrapper>
              <SocialLoginButton
                onClick={handleKakaoOauth}>
                <img src={Kakao} alt="kakaotalk" />
              </SocialLoginButton>
              <SocialLoginButton
                onClick={handleGoogleOauth}>
                <img src={Google} alt="Google" />
              </SocialLoginButton>
              <SocialLoginButton
                onClick={handleNaverOauth}>
                <img src={Naver} alt="Naver" />
              </SocialLoginButton>
            </SocialLoginButtonWrapper>
          </SocialLoginBox>
        </LoginWrapper>
      )}
    </Formik> */}
    </div>
  );
}

export { LoginModal };