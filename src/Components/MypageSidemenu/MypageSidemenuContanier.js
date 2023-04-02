import React from 'react'
import { useNavigate } from "react-router-dom";
import MypageSidemenuView from './MypageSidemenuView';

const MypageSidemenuContanier = () => {
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
    
    
  return (
    <MypageSidemenuView
        onUserSettingClick = {onUserSettingClick}
        onMyPostsClick = {onMyPostsClick}
        onScrapClick = {onScrapClick}
       />
  )
}

export default MypageSidemenuContanier