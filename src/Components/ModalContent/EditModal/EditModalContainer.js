import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import EditModalView from './EditModalView';
import { getCookieValue } from '../../../Pages/api/loginApi';
import { setTokenHeaders } from '../../../Pages/api/apiGetTokenHeader';
import { setCookie, } from '../../../Pages/api/loginApi';
import BasicProfileImageURL from "../../../Assets/Images/BasicProfilePhoto.png"


const EditModalContainer = (props,{profileimageUrl}) => {
  console.log(props)
  console.log(profileimageUrl)
  const userNickname = getCookieValue("user")
  const headers = setTokenHeaders();

  const [profielModal, setProfielModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState("")

  const inputFileRef = useRef(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [fileError, setFileError] = useState("");


  // const handleClickEditIcon = () => {
  //   inputFileRef.current.click();
  // };

  const [showImageOptions, setShowImageOptions] = useState(false);

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
          `https://bstaging.interviewbank.net/account/me`,
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
  },[headers])

  const handleUploadComplete = (uploadedFileUrl) => {
    setProfileImageUrl(uploadedFileUrl);
  }
  
  const handleUpdateUserinfo =  (values) => {
    console.log(values.nickname);
    if (!values.nickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,16}$/)){
      setErrorMsg("1글자 이상 16글자 이하로 입력해주세요.");
      console.log("nickname check")
      return
    }else{
      const updateNickname = async () => {
        try{
          const response = await axios.put(
            `https://bstaging.interviewbank.net/account/nickname`,
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

  const handleUpdateProfilePhoto = async (e) =>{
    e.preventdefault()
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData.get('file'));

    try {
      const response = await axios.post("https://bstaging.interviewbank.net/account/profile-image", 
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

  const handleResetClick = async () => {

    try{
      const response = await axios.put(
        `https://bstaging.interviewbank.net/account/initialize/profile-image`,
        {headers}
      );
      console.log(response)
    }catch(error){
      console.log(error);
    }


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
    setShowImageOptions = {setShowImageOptions}/>

  )
}

export default EditModalContainer