import React, { useState, useEffect } from "react";
import HeaderView from "./HeaderView";
import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";
import { setTokenHeaders } from "../../Pages/api/apiGetTokenHeader";
import axios from "axios";

const HeaderContainer = () => {
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

  const headers = setTokenHeaders();
  useEffect(() => {
    const getmydata = async () => {
      try {
        console.log(headers)
        const response = await axios.get(
          `https://bstaging.interviewbank.net/account/me`,
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
  },[headers])
  return <HeaderView 
    loginModal={LoginModal} 
    setLoginModal={setLoginModal} 
    profile = {profile} 
    setProfile={setProfile} 
    isAuth={isAuth}
    profileImageUrl = {profileImageUrl}/>;
};

export default HeaderContainer;
