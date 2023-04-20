import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView";
import axios from "axios";
import { deleteCookie } from '../../Pages/api/loginApi';
import { setTokenHeaders } from '../../Pages/api/apiGetTokenHeader';
import { checkCookieExistence, getCookieValue } from '../../Pages/api/loginApi';


const ProfileContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/account/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserNickname = getCookieValue("user");
  const onLogoutClick = async () => {
    const headers = setTokenHeaders();

    await axios
      .post(API_URL + "logout", {}, { headers })
      .then((res) => {
        deleteCookie('authToken');
        deleteCookie('userId');
        deleteCookie('user');
        if ((window.location.pathname === '/post' || window.location.pathname === '/my-posts' || window.location.pathname === '/scrap')) navigate('/');
        else window.location.reload();
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onScrapClick = () => {
    navigate("/mypage/my-scrap");
  };

  const onMyPostsClick = () => {
    navigate("/mypage/my-posts");
  };

  return (
    <ProfileView
      onLogoutClick={onLogoutClick}
      onScrapClick={onScrapClick}
      onMyPostsClick={onMyPostsClick}
      UserNickname = {UserNickname}
      navigate = {navigate}
    />
  );
};

export default ProfileContainer;
