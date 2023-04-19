import React from 'react'
import MypageSidemenuContanier from '../../../Components/MypageSidemenu/MypageSidemenuContanier'
import Layout from '../../../Layout/Layout'
import styled from "styled-components";
import Modal from '../../../Components/Modal/EditModal';
import EditModalContainer from '../../../Components/ModalContent/EditModal/EditModalContainer';

const UserSettingView = ({data, editModal, setEditModal, navigate}) => {
  const { email, passwordUpdatedAt, nickname, imageUrl } = data;
  return (
    <Layout>
      <UserSettingLayout>
      <UserSettingContainer>
        <MypageSidemenuContanier currentMenu = "UserSetting"/>
        <UserSettingWrapper>
          <UserinfoTitle>
            기본 정보
          </UserinfoTitle>
          <UserinfoBox>
            <UserinfoWrapper>
              <ProfilePhoto
                src={imageUrl}/>
              <Userinfo>
                <UserNicknameWrapper>
                <UserNickname>{nickname}님</UserNickname>
                <UserinfoEditBtn
                  onClick={() => {
                    setEditModal(true);
                  }}>
                    수정
                </UserinfoEditBtn>
                {editModal && (
                      <Modal
                        CloseModal={() => {
                          setEditModal(!editModal);
                        }}
                      >
                        <EditModalContainer />
                      </Modal>
                )}
                </UserNicknameWrapper>
                <UserEmailTitle>이메일</UserEmailTitle>
                <UserEmail>{email}</UserEmail>
              </Userinfo>
            </UserinfoWrapper>
          </UserinfoBox>
          <UserPassword>
            비밀번호
          </UserPassword>
          <UserPasswordBox>
            <Recentinfo>
              최근 변경일 : {passwordUpdatedAt}
            </Recentinfo>
            <UserPasswordEditBtn onClick={()=>{navigate("/reset-password")}}>비밀번호 변경</UserPasswordEditBtn>
          </UserPasswordBox>
        </UserSettingWrapper>
      </UserSettingContainer>
      </UserSettingLayout>
    </Layout>
  )
}

export default UserSettingView

const UserSettingLayout = styled.div`
  position: absolute;
  display: flex; 
  width: 100%;
  height: 750px;
  justify-content: center; 
  top : 50px;

  margin : 0 auto;
`;

const UserSettingContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
`;

const UserSettingWrapper = styled.div`
  position: relative;
  display: flex;

  min-height: 100vh;
  width: 950px;
  max-width: 1100px;

  flex-direction: column;
  justify-content: left;
`;

const UserinfoTitle = styled.div`
  position: relative;
  width: 110px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  text-align: center;

  color: #000000;
`;

const UserinfoBox = styled.div`
  box-sizing: border-box;

  position: relative;

  width: 952px;
  height: 169px;

  display: flex;
  flex-direction: column;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  margin-top: 16px;

`;

const UserinfoWrapper = styled.div`
  position: relative;

  width : fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;

  padding-top: 36px;
  padding-left: 35px;
  padding-bottom: 36px;

`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 97px;
  height: 97px;

  border-radius: 8px;

  margin-right: 48px;
`;

const Userinfo = styled.div`
  position: relative;

  width: 508px;
  height: 120px;

  display: flex;
  flex-direction: column;

`;

const UserNicknameWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  width: fit-content;
  height: fit-content;

  margin-bottom : 18px;
`;

const UserNickname = styled.div`
  position: relative;
  width: fit-content;
  height: 29px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  color: #5C5C5C;

  margin-right: 20px;

`;


const UserinfoEditBtn = styled.button`
  position: relative;
  width: 80px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;

  background: #2E55E7;
  border-radius: 4px;
  border: #2E55E7;

  cursor: pointer;
`;
const UserEmailTitle = styled.div`
  position: relative;

  width: 45px;
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #5C5C5C;
`;

const UserEmail = styled.div`
  position: relative;
  width: fit-content;
  height: 23px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;

  color: #2E55E7;
`;

const UserPassword = styled.div`
  position: relative;
  width: 100px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
  
  margin-top: 46px;
`;

const UserPasswordBox = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 952px;
  height: 87px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  
  margin-top: 16px;
`;

const Recentinfo = styled.div`
  position: relative;
  width: fit-content;
  height: 24px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #5C5C5C;

  margin-left: 47px;
  /* 반응형하면 사이 간격 어떻게 하지? */
`;

const UserPasswordEditBtn = styled.button`
  position: relative;
  width: 113px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
  background: #2E55E7;
  border-radius: 4px;
  border: #2E55E7;

  margin-right: 36px;

  cursor: pointer;
`;