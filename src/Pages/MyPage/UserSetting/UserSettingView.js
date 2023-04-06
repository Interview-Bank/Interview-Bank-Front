import React from 'react'
import MypageSidemenuContanier from '../../../Components/MypageSidemenu/MypageSidemenuContanier'
import Layout from '../../../Layout/Layout'
import styled from "styled-components";
import BasicProfilePhoto from "../../../Assets/Images/BasicProfilePhoto.png"
import Modal from '../../../Components/Modal/EditModal';
import EditModalContainer from '../../../Components/ModalContent/EditModal/EditModalContainer';

const UserSettingView = ({userNickname, editModal, setEditModal, userEmail, passwordUpdatedAt }) => {
  return (
    <Layout>
      <UserSettingLayout>
      <UserSettingContainer>
        <MypageSidemenuContanier/>
        <UserSettingWrapper>
          <UserSettingTitle>
            계정 관리
          </UserSettingTitle>
          <UserinfoTitle>
            기본 정보
          </UserinfoTitle>
          <UserinfoBox>
            <UserinfoWrapper>
              <ProfilePhoto
                src={BasicProfilePhoto}></ProfilePhoto>
              <Userinfo>
                <UserEmailTitle>이메일</UserEmailTitle>
                <UserEmail>{userEmail}</UserEmail>
                <UserNickname>{userNickname}님</UserNickname>
              </Userinfo>
            </UserinfoWrapper>
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
          </UserinfoBox>
          <UserPassword>
            비밀번호
          </UserPassword>
          <UserPasswordBox>
            <Recentinfo>
              최근 변경일 : {passwordUpdatedAt}
            </Recentinfo>
            <UserPasswordEditBtn>비밀번호 변경</UserPasswordEditBtn>
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
  left : 40px;
`;

const UserSettingContainer = styled.div`
  position: absolute;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
  margin-left: 130px;
`;

const UserSettingWrapper = styled.div`
  position: relative;
  display: flex;
  width : fit-content;
  height : fit-content;
  flex-direction: column;
  justify-content: left;
`;

const UserSettingTitle = styled.div`
  position: relative;
  width: 140px;
  height: 39px;


  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  text-align: center;

  color: #2E55E7;

`;

const UserinfoTitle = styled.div`
  position: relative;
  width: 120px;
  height: 29px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  text-align: center;

  margin-top: 27px;
  color: #000000;
`;

const UserinfoBox = styled.div`
  box-sizing: border-box;

  position: relative;
  width : 950px;
  height: 400px;

  display: flex;
  flex-direction: column;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 20px;

  margin-top: 15px;

`;

const UserinfoWrapper = styled.div`
  position: relative;

  width : 659px;
  height: 120px;

  top : 46px;
  left : 63px;

  display: flex;
  flex-direction: row;

`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 120px;
  height: 120px;

  border-radius: 100%;

  margin-right: 31px;
`;

const Userinfo = styled.div`
  position: relative;

  width: 508px;
  height: 120px;

  display: flex;
  flex-direction: column;

`;

const UserEmailTitle = styled.div`
  position: relative;

  width: 75px;
  height: 29px;
  /* left: 884px;
  top: 334px; */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  color: #5C5C5C;
`;

const UserEmail = styled.div`
  position: relative;
  width: 508px;
  height: 49px;
  /* left: 884px;
  top: 363px; */

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;

  color: #2E55E7;

`;

const UserNickname = styled.div`
  position: relative;
  width: 153px;
  height: 29px;
  /* left: 884px;
  top: 417px; */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  color: #5C5C5C;

  margin-top: 5px;
`;

const UserinfoEditBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 40px;
  left: 820px;
  top: 320px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #FFFFFF;
  background: #2E55E7;
  border-radius: 3px;
  border: #2E55E7;

  cursor: pointer;
`;

const UserPassword = styled.div`
  position: relative;
  width: 100px;
  height: 29px;
  /* left: 670px;
  top: 717px; */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  text-align: center;

  color: #000000;

  margin-top: 37px;
`;

const UserPasswordBox = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 950px;
  height: 100px;
  /* left: 670px;
  top: 761px; */

  display: flex;
  flex-direction: row;
  align-items: center;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 20px;

  margin-top: 15px;

  & > div:not(:last-child) {
    margin-right: 421px;
  }
`;

const Recentinfo = styled.div`
  position: relative;
  width: 269px;
  height: 24px;
  /* left: 717px;
  top: 799px; */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #5C5C5C;

  margin-left: 47px;
`;

const UserPasswordEditBtn = styled.button`
  position: relative;
  width: 170px;
  height: 40px;
  /* left: 1407px;
  top: 791px; */

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #FFFFFF;
  background: #2E55E7;
  border-radius: 3px;
  border: #2E55E7;
`;