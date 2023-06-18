import React from 'react'
import { useNavigate } from "react-router-dom";
import MypageSidemenuView from './MypageSidemenuView';

const MypageSidemenuContanier = (props) => {
    const navigate = useNavigate()

    const onUserSettingClick = () => {
        navigate("/mypage/usersetting");
    }
    const onMyPostsClick = () => {
        navigate("/mypage/my-posts");
      };
    const onScrapClick = () => {
        navigate("/mypage/my-scrap");
      };

    const onManagePostClick = () => {
        navigate("/mypage/manage-posts")
    }
  return (
    <MypageSidemenuView
        currentMenu = {props.currentMenu}
        onUserSettingClick = {onUserSettingClick}
        onMyPostsClick = {onMyPostsClick}
        onScrapClick = {onScrapClick}
        onManagePostClick = {onManagePostClick}
       />
  )
}

export default MypageSidemenuContanier