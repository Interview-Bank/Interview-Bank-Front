import axios from "axios";
import LoginView from "./LoginView";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../Redux/Reducers/AuthReducer.js";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { setCookie, setCookieExpires } from '../api/loginApi';

const LoginContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/";
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const [loginError, setLoginError] = useState({})
  const loginSubmit = async (values) => {
    const { email, password } = values;
    try {
      await axios
        .post(API_URL + "account/login", {
          email,
          password,
        })
        .then((res) => {
          setCookieExpires('authToken', res.headers.get("X-Auth-Token"));
          setCookie('userId', res.data.accountId);
          setCookie('user', res.data.nickname);
          setLoginError({})
          if ((window.location.pathname === '/select' || window.location.pathname === '/signup')) navigate('/');
          else window.location.reload();
        });
    } catch (e) {
      setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
    }
  };

  const handleGoogleOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/google/login";
    window.location.assign(oauthUrl);
  };
  
  const handleKakaoOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/kakao/login";
    window.location.assign(oauthUrl);
  };
  const handleNaverOauth = () => {
    const oauthUrl = "http://bstaging.interviewbank.net/account/oauth/naver/login";
    window.location.assign(oauthUrl);
  };

  return (
    <LoginView 
      loginSubmit={loginSubmit} 
      navigate={navigate} 
      loginError={loginError}
      handleGoogleOauth={handleGoogleOauth}
      handleKakaoOauth = {handleKakaoOauth}
      handleNaverOauth = {handleNaverOauth}
    />);
};

export default LoginContainer;
