import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../Redux/Reducers/AuthReducer";
import ProfileView from "./ProfileView";
import axios from "axios";
import { getCookieValue, deleteCookie } from '../../Pages/api/loginApi';


const ProfileContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/account/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  const onLogoutClick = async () => {
    const headers = {
      "X-Auth-Token": getCookieValue("authToken="),
    };

    await axios
      .post(API_URL + "logout", {}, { headers })
      .then((res) => {
        console.log(res);
        // dispatch(setToken(""));
        deleteCookie('userId');
        deleteCookie('user');
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onScrapClick = () => {
    navigate("/scrap");
  };

  const onMyPostsClick = () => {
    navigate("/my-posts");
  };

  return (
    <ProfileView
      onLogoutClick={onLogoutClick}
      onScrapClick={onScrapClick}
      onMyPostsClick={onMyPostsClick}
    />
  );
};

export default ProfileContainer;
