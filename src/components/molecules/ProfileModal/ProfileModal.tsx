import React from 'react'

type Props = {}

const ProfileModal = (props: Props) => {
  onst AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

  const userNickname = getCookieValue("user")
  const headers = setTokenHeaders();

  const [profielModal, setProfielModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState("")

  const inputFileRef = useRef(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [fileError, setFileError] = useState("");

  const [showImageOptions, setShowImageOptions] = useState(false);

  const [isResetimage, setIsResetimage] = useState(false)

  const handleClickEditIcon = () => {
    setShowImageOptions(!showImageOptions);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setProfielModal(true);
      setFileError(""); 
    } else {
      setFileError("이미지 파일만 가능합니다.");
    }
  };

  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const getmydata = async () => {
      try {
        console.log(headers)
        const response = await axios.get(
          `${AccountBaseUrl}/me`,
          {headers}
        );
        console.log(response)
        setProfileImageUrl(response.data.imageUrl)
        return response.data.imageUrl;
      } catch (error) {
        console.error(error);
      }
    }
    getmydata();
  },[])

  const handleUploadComplete = (uploadedFileUrl) => {
    setProfileImageUrl(uploadedFileUrl);
  }
  
  const handleUpdateUserinfo =  (values) => {
    if (!values.nickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,16}$/)){
      setErrorMsg("1글자 이상 16글자 이하로 입력해주세요.");
      return
    }else{
      const updateNickname = async () => {
        try{
          const response = await axios.put(
            `${AccountBaseUrl}/nickname`,
            {nickname: values.nickname}, {headers}
          );
          console.log(response)
          setCookie('user', values.nickname);
          window.location.reload();
        }catch(error){
          console.log(error);
        }
      };

      updateNickname();
    }
  }

  const handleUpdateProfilePhoto = async () =>{
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData.get('file'));
    console.log(isResetimage)
    if (isResetimage){
      try{
        const response = await axios.put(
          `${AccountBaseUrl}/initialize/profile-image`,
          null,
          {headers}
        );
        console.log(response)
      }catch(error){
        console.log(error);
      }
    }else{
      try {
        const response = await axios.post(`${AccountBaseUrl}/profile-image`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...headers
          }
        })
        console.log(response)
      } catch (error) {
        console.log(error);
      };
    }
  }

  const handleResetClick = () => {
    setShowImageOptions(false);
    setProfileImageUrl(BasicProfilePhotoUrl)
    setIsResetimage(true)
  };
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
  )
}

export default ProfileModal