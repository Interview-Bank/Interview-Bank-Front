import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView";
import axios from "axios";
import { deleteCookie } from '../../Pages/api/loginApi';
import { setTokenHeaders } from '../../Pages/api/apiGetTokenHeader';
import { getCookieValue } from '../../Pages/api/loginApi';


const ProfileContainer = ({profileImageUrl}) => {
  const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;
  const navigate = useNavigate();
  const UserNickname = getCookieValue("user");
  const onLogoutClick = async () => {
    const headers = setTokenHeaders();

    await axios
      .post(AccountBaseUrl + "/logout", {}, { headers })
      .then((res) => {
        deleteCookie('authToken');
        deleteCookie('userId');
        deleteCookie('user');
        if ((window.location.pathname === '/post' || window.location.pathname === '/mypage/usersetting' || window.location.pathname === `/mypage/my-posts` || window.location.pathname ===  `/mypage/my-scrap`)) navigate('/');
        else window.location.reload();
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
      profileImageUrl = {profileImageUrl}
    />
  );
};

export default ProfileContainer;
