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
          // sessionStorage.setItem('authToken', res.headers.get("X-Auth-Token"));
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
    const oauthUrl = "https://bstaging.interviewbank.net/account/oauth/google/login";
    const width = 500;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
  
    const popupWindow = window.open(oauthUrl, "popup", "popup=true");
    const checkPopup = setInterval(() => {
      console.log(popupWindow.window.location.href)
      if(!popupWindow || !popupWindow.closed){
        clearInterval(checkPopup)
        return
      }
      if(popupWindow.window.location.href.includes("state") && popupWindow.window.location.href.includes("code")){
        console.log(popupWindow.window.location.href)
        popupWindow.close()
      }
    }, 1000)
  };
  

  return (
    <LoginView 
      loginSubmit={loginSubmit} 
      navigate={navigate} 
      loginError={loginError}
      handleGoogleOauth={handleGoogleOauth}
    />);
};

export default LoginContainer;
