import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from './LoginModal.module.scss';
import Close from 'public/Icons/close.png';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/router';
import { isLogin } from '@/pages/api/login/loginProcess';
import { setCookie, setCookieExpires } from '@/pages/api/login/loginCheck';
import { useDispatch } from 'react-redux';
import { modalSlice } from '@/redux/modalReducer';

interface LoginModalProps {
  onClickEvent: () => void;
  active: boolean;
}

interface LoginModalRequestDataProps {
  email: string;
  password: string;
}

const LoginModal = ({ onClickEvent, active }: LoginModalProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const defaultValue: LoginModalRequestDataProps = {
    email: "",
    password: "",
  }
  useEffect(() => {
    active
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  },[active])
  const [loginData, setLoginData] = useState({ ...defaultValue });
  const onChange = (field: string, value: string) => {
    setLoginData((prev) => { return {...prev, [field]: value}})
  }


  const isLoginSubmit = () => {
    validationCheckForLogin()
      && isLogin(loginData)
        .then(response => {
          dispatch(modalSlice.actions.CLOSE());
          setCookieExpires('authToken', response.headers["x-auth-token"]);
          setCookie('userId', response.data.accountId);
          setCookie('user', response.data.nickname);
          if (router.pathname.includes('/register')) router.push('/');
          else router.reload();
          // dispatch(modalSlice.actions.CLOSE());
        })
        .catch(reject => console.log(reject))
  }
  //     setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
  const linkRegisterPage = () => {
    router.push("/register");
    onClickEvent()
  }

  const validationCheckForLogin = () => {
    const { email, password } = loginData;
    if (!email) {
      dispatch(modalSlice.actions.OPEN(
        { title: "아이디를 입력해주세요.", content: "" }
      ));
			return false;
		}
    if (!password) {
      dispatch(modalSlice.actions.OPEN(
        { title: "비밀번호를 입력해주세요.", content: "" }
      ))
			return false;
		}
    return true;
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
            onChange={(e) => onChange("password", e.target.value)}
            onKeyDown={(e) => {
              e.key === 'Enter' && isLoginSubmit();
            }}
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