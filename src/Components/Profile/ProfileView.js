import React from "react";
import styled from "styled-components";

const ProfileView = ({ onLogoutClick, onScrapClick, onMyPostsClick }) => {
    console.log(onLogoutClick)
  return (
    <ProfileContainer>
      <UserInfo></UserInfo>
      <Button type="button" onClick={onScrapClick}>스크랩한 글</Button>
      <Button type="button" onClick={onMyPostsClick}>작성한 글</Button>
      <Button type="button" onClick={onLogoutClick}>
        로그아웃
      </Button>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  margin-top: 45px;
  position: fixed;
  background-color: #fff;
  width: 200px;
  height: 120px;
  text-align: center;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
`;
const UserInfo = styled.div``;
const Button = styled.button`
  cursor: pointer;
  background-color: #fff;
  font-weight: 700;
  margin-top: 17px;
  padding-left: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: none;
  :hover {
    color: #2e55e7;
  }
`;

export default ProfileView;
