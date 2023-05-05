import axios from "axios";
import LoginView from "./LoginView";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { setCookie, setCookieExpires } from '../api/loginApi';

const LoginContainer = () => {
  const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;
  const AccountOauthBaseUrl = process.env.REACT_APP_API_ACCOUNT_OAUTH_BASE_URL

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState({})
  const loginSubmit = async (values) => {
    const { email, password } = values;
    try {
      await axios
        .post(AccountBaseUrl + "/login", {
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
