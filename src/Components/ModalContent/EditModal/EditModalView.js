import React from 'react'
import { Formik } from "formik";
import styled from "styled-components";
import BasicProfilePhotoURL from "../../../Assets/Images/BasicProfilePhoto.png"
import ProfileEditiconURL from "../../../Assets/Icons/Profile_Edit.png"
const EditModalView = ({handleUpdateNickname, onClose, handleNicknameChange, ErrorMsg, userNickname}) => {
  console.log(userNickname)
  return (
    <Formik
      initialValues={{
        nickname : userNickname
      }}
      onSubmit={handleUpdateNickname}
    >{({values, handleSubmit, handleChange}) => (
      <form 
        onSubmit={handleSubmit} 
        autoComplete="off"
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault(); // form 태그의 submit 기본 동작을 방지합니다.
            handleSubmit(); // handleSubmit 함수를 실행합니다.
          }
        }}>
        <EditModalWrapper>
          <EditProfilePhotoWrapper>
            <ProfilePhoto src={BasicProfilePhotoURL}/>
            <ProfileEditIcon src = {ProfileEditiconURL}/>
          </EditProfilePhotoWrapper>

          <EditUserNicknameWrapper>
            <NicknameTitle>
              닉네임
            </NicknameTitle>
            <NewNicknameInput
              type='text'
              value={values.nickname}
              name="nickname"
              variant="outlined"
              onChange={handleChange}
            >
            </NewNicknameInput>
            <ErrorMessage >
                  {ErrorMsg}
            </ErrorMessage>
          </EditUserNicknameWrapper>
          <ButtonWarraper>
                <CloseButton onClick={onClose}>취소</CloseButton>
                <SaveButton type="submit">저장</SaveButton>
            </ButtonWarraper>
        </EditModalWrapper>
      </form>

    )}
    </Formik>
  )
}
const EditModalWrapper = styled.div`
  position: absolute;
  width : 100%;
  height : 100%;
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`;

const EditProfilePhotoWrapper = styled.div`
  position: relative;

  width: fit-content;
  height: fit-content;

  margin-bottom: 40px;
`;

const ProfilePhoto = styled.img`
  position: relative;

  width: 143px;
  height: 143px;
  border-radius: 8px;

`;

const ProfileEditIcon = styled.img`
  position: absolute;
  width: 36px;
  height: 36px;
  top : 125px;
  left : 125px;
  cursor: pointer;


`;

const EditUserNicknameWrapper = styled.div`
  position: relative;

  width: fit-content;
  height: fit-content;

  display: flex;

  flex-direction: column;
  justify-content: left;

  margin-bottom: 48px;

`;

const NicknameTitle = styled.div`
  position: relative;
  width: 50px;
  height: 23px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: left;

  color: #000000;

  margin-bottom: 8px;
`;

const NewNicknameInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 452px;
  height: 55px;

  background: #FFFFFF;
  border: 2px solid #2E55E7;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
    position: relative;
    top : 20px;
    color: red;
    font-size: 13px;
    font-family: "Inter", sans-serif;
`;
const ButtonWarraper = styled.div`
  position: relative;

  width : fit-content;
  height : fit-content;

  display : flex;
  flex-direction : row;
  justify-content : center;
  align-items: center;

`;
const CloseButton = styled.button`
  width: 80px;
  height: 35px;
  background: #AAAAAA;
  border-radius: 4px;

  cursor: pointer;

  background-color: #AAAAAA;
  border: none;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
  z-index: 2;

  margin-right: 8px;
`;
const SaveButton = styled.button`
  width: 80px;
  height: 35px;
  cursor: pointer;
  background-color: #2E55E7;
  border: none;
  border-radius: 4px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
  z-index: 2;
`;

export default EditModalView