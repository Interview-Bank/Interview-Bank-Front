import axios from "axios";
import LoginView from "./LoginView";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../Redux/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

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
          const userId = res.data.accountId;
          const authToken = res.headers.get("X-Auth-Token");
          dispatch(setToken(authToken));
          dispatch(setUserId(userId));
          localStorage.setItem("user", res.data.nickname);
          setLoginError({})
          window.location.reload();
        });
    } catch (e) {
      setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
    }
  };

  const handleGoogleOauth = () => {
    const oauthUrl = "http://localhost:8084/account/oauth/google/login";
    //이 oauthUrl이 구글 로그인 URL이니까 이 URL로 접근했을 때 사용될 코드를 새로운 컴포넌트로 따야함.
    console.log(oauthUrl)
    const width = 500;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
  
    window.location.assign(oauthUrl);
    // const checkPopup = setInterval(() => {
    //   if (!popupWindow || popupWindow.closed) {
    //     clearInterval(checkPopup);
    //     return;
    //   }
    //   console.log(popupWindow.location.href);
    // }, 1000);  
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
