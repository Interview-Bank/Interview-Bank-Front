import React, { useState, useEffect } from "react";
import HeaderView from "./HeaderView";
import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";
import { setTokenHeaders } from "../../Pages/api/apiGetTokenHeader";
import axios from "axios";
import { checkCookieExistence } from "../../Pages/api/loginApi";

const HeaderContainer = () => {
  const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

  const [LoginModal, setLoginModal] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState(false)
  const token = useSelector((state) => state.Auth.token);
  const [profileImageUrl, setProfileImageUrl] = useState(null)

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  const isLogin = checkCookieExistence()
  const headers = setTokenHeaders();
  useEffect(() => {
    if (isLogin) {
      const getmydata = async () => {
        try {
          console.log(headers)
          const response = await axios.get(
            `${AccountBaseUrl}/me`,
            {headers}
          );
          console.log(response)
          setProfileImageUrl(response.data.imageUrl)
          return response.data.imageUrl;
        } catch (error) {
          console.error(error);
        }
      }
      getmydata();
    }
  },[AccountBaseUrl, headers, isLogin])
  return <HeaderView 
    loginModal={LoginModal} 
    setLoginModal={setLoginModal} 
    profile = {profile} 
    setProfile={setProfile} 
    isAuth={isAuth}
    profileImageUrl = {profileImageUrl}/>;
};

export default HeaderContainer;
