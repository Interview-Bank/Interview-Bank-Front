import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import EditModalView from './EditModalView';
import { getCookieValue } from '../../../Pages/api/loginApi';
import { setTokenHeaders } from '../../../Pages/api/apiGetTokenHeader';
import { setCookie, } from '../../../Pages/api/loginApi';
import BasicProfilePhotoUrl from "../../../Assets/Images/BasicProfilePhoto.png"


const EditModalContainer = (props) => {
  const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

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
    <EditModalView
    handleUpdateUserinfo = {handleUpdateUserinfo}
    onClose = {props.CloseModal}
    ErrorMsg = {ErrorMsg}
    userNickname = {userNickname}
    profielModal = {profielModal}
    setProfielModal = {setProfielModal}
    selectedFile = {selectedFile} 
    setSelectedFile = {setSelectedFile}
    handleClickEditIcon = {handleClickEditIcon}
    handleFileChange = {handleFileChange}
    inputFileRef = {inputFileRef}
    fileError = {fileError}
    setFileError = {setFileError}
    profileImageUrl = {profileImageUrl}
    handleUploadComplete = {handleUploadComplete}
    handleUpdateProfilePhoto = {handleUpdateProfilePhoto}
    showImageOptions = {showImageOptions}
    setShowImageOptions = {setShowImageOptions}
    handleResetClick = {handleResetClick}
    />

  )
}

export default EditModalContainer