import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from './LoginModal.module.scss';
import { useRouter } from 'next/router';
import { isLogin } from '@/pages/api/login/loginProcess';
import { setCookie, setCookieExpires } from '@/pages/api/login/loginCheck';

import { useDispatch } from 'react-redux';
import { modalSlice } from '@/redux/modalReducer';
import { tokenSlice } from '@/redux/tokenReducer';

import Close from 'public/Icons/close.png';
import AlertIconUrl from "public/Icons/alertIcon.png"

import { Input, Button } from '@/components/atoms';
import { emailPatternCheck } from '@/pages/api/emailPatternCheck';

interface LoginModalProps {
  onClickEvent      : () => void;
  active            : boolean;
}

interface LoginModalRequestDataProps {
  email             : string;
  password          : string;
}

const defaultValue: LoginModalRequestDataProps = {
  email: "",
  password: "",
}

const LoginModal = ({ onClickEvent, active }: LoginModalProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ loginData   , setLoginData  ] = useState({ ...defaultValue });
  const [ loginError  , setLoginError ] = useState({
    errorMessage: ""
  })

  useEffect(() => {
    active
      ? document.documentElement.style.overflow = "hidden"
      : document.documentElement.style.overflow = "unset"
    return () => {
      document.documentElement.style.overflow = "unset"
    }
  }, [active])
  
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
            dispatch(tokenSlice.actions.SET({headers: {'X-Auth-Token': response.headers["x-auth-token"]}}))
            if (router.pathname.includes('/register')) router.push('/');
            else router.reload();
        })
        .catch(reject =>
          setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
        )
  }

  const moveRegisterPage = () => {
    router.push("/register");
    onClickEvent();
  }

  const moveFindPage = () => {
    router.push("/find");
    onClickEvent();
  }

  const validationCheckForLogin = () => {
    const { email, password } = loginData;

    if (!emailPatternCheck(email)) {
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
          <Input
            name            = 'email'
            value           = {loginData.email}
            type            = 'email'
            placeholder     = '이메일'
            onChangeEvent   = {onChange}
            pattern         = ".+@globex\.com"
          />
          <Input
            name            = 'password'
            value           = {loginData.password}
            type            = 'password'
            placeholder     = '비밀번호'
            onChangeEvent   = {onChange}
            onKeyDown       = {true}
            onKeyDownEvent  = {isLoginSubmit}
          />
          {loginError.errorMessage && 
            <div className={styles.error}>
              <Image src={AlertIconUrl} alt='경고 아이콘' width={18} height={18}/>
              <div className={styles.message}>
                {loginError.errorMessage}
              </div>
            </div>
          }
          <Button value='로그인' onClickEvent={isLoginSubmit} />
        </div>
        <div className={styles.find__area}>
          <span onClick={() => moveRegisterPage()} >
            회원가입
          </span>
          <div></div>
          <span onClick={() => moveFindPage()} >
            비밀번호 찾기
          </span>
        </div>
        <div className={styles.social}>
          <div className={styles.title}>
            다른 계정으로 로그인
          </div>
          <div className={styles.btn__area}>
            <Button onClickEvent={handleKakaoOauth}   image={"KAKAO"}   value=''/>
            <Button onClickEvent={handleGoogleOauth}  image={"GOOGLE"}  value=''/>
            <Button onClickEvent={handleNaverOauth}   image={"NAVER"}   value=''/>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginModal };