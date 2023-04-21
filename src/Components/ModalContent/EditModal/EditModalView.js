import React from 'react'
import { Formik } from "formik";
import styled from "styled-components";
import Modal from '../../../Components/Modal/ProfilePhotoModal';
import ProfilePhotoModalContainer from '../ProfilePhotoModal/ProfilePhotoModalContainer';
import ProfileEditiconURL from "../../../Assets/Icons/Profile_Edit.png"
import DeleteIconURL from "../../../Assets/Icons/DeleteIcon.png"
import AlertIconURL from "../../../Assets/Icons/alertIcon.png"
import ImageOptionsModal from '../../Modal/ImageOptionsModal';

const EditModalView = ({
  handleUpdateUserinfo, 
  onClose, 
  ErrorMsg, 
  userNickname, 
  profielModal, 
  setProfielModal,
  selectedFile, 
  handleClickEditIcon,
  handleFileChange,
  inputFileRef,
  fileError,
  profileImageUrl,
  handleUploadComplete,
  handleUpdateProfilePhoto,
  showImageOptions,
  setShowImageOptions,
  handleResetClick,
  }) => {
  console.log(profileImageUrl)
  console.log(userNickname)
  return (
    <Formik
      initialValues={{
        nickname : userNickname
      }}
      onSubmit={handleUpdateUserinfo}
    >{({values, handleSubmit, handleChange}) => (
      <form 
        onSubmit={handleSubmit} 
        autoComplete="off"
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}>
        <EditModalWrapper>
          <EditProfilePhotoWrapper>
            <ProfilePhoto src={profileImageUrl}/>
            <ProfileEditIcon 
              src = {ProfileEditiconURL}
              onClick={handleClickEditIcon}/>
              {showImageOptions && (
                <ImageOptionsModal
                  onUploadClick={() => {
                    inputFileRef.current.click();
                    setShowImageOptions(false);
                  }}
                  onResetClick={handleResetClick}/>
              )}
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {profielModal && (
                  <Modal
                    CloseModal={() => {
                      setProfielModal(!profielModal);
                    }}
                  >
                    <ProfilePhotoModalContainer selectedFile={selectedFile} handleUploadComplete = {handleUploadComplete}/>
                  </Modal>
                  )}
          </EditProfilePhotoWrapper>
          {fileError && 
            <FileErrorMessageWrapper>
              <AlertIcon src = {AlertIconURL}/>
              <FileErrorMessage>{fileError}</FileErrorMessage>
            </FileErrorMessageWrapper>
          }

          <EditUserNicknameWrapper>
            <NicknameTitle>
              닉네임
            </NicknameTitle>
            <NewNicknameInputWrapper>
              <NewNicknameInput
                type='text'
                value={values.nickname}
                name="nickname"
                variant="outlined"
                onChange={handleChange}
              >
              </NewNicknameInput>
              <DeleteIcon onClick={() => handleChange({ target: { name: "nickname", value: "" } })} src={DeleteIconURL} />
            </NewNicknameInputWrapper>
            {ErrorMsg && 
                        <ErrorMessageWrapper>
                          <AlertIcon src = {AlertIconURL}/>
                          <ErrorMessage >
                                {ErrorMsg}
                          </ErrorMessage>
                      </ErrorMessageWrapper>}
          </EditUserNicknameWrapper>
          <ButtonWarraper>
                <CloseButton onClick={onClose}>취소</CloseButton>
                <SaveButton type="submit" onClick = {handleUpdateProfilePhoto} >저장</SaveButton>
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

  margin-bottom: 22px;
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

const FileErrorMessageWrapper = styled.div`
  position: absolute; // 절대 위치 설정
  bottom: 197px; // EditUserNicknameWrapper의 하단에서 적절한 거리로 조정

  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FileErrorMessage = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #F50D0D;
`;
const EditUserNicknameWrapper = styled.div`
  position: relative;

  width: fit-content;
  height: fit-content;

  display: flex;

  flex-direction: column;
  justify-content: left;

  padding-bottom: 48px;

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

const NewNicknameInputWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 452px;
  height: 55px;

  background: #FFFFFF;
  border: 2px solid #2E55E7;
  border-radius: 8px;

  padding-left: 16px;
`;

const NewNicknameInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 400px;
  height: 45px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  color: #000000;

  background: #FFFFFF;
  border: none;
  outline: none;

`;

const DeleteIcon = styled.img`
  position: relative;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
const ErrorMessageWrapper = styled.div`
  position: absolute; // 절대 위치 설정
  bottom: 25px; // EditUserNicknameWrapper의 하단에서 적절한 거리로 조정

  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AlertIcon = styled.img`
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;

  margin-right: 2px;
`;
const ErrorMessage = styled.div`
  position: relative;
  width: 326px;
  height: 21px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  /* identical to box height */


  color: #F50D0D;
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