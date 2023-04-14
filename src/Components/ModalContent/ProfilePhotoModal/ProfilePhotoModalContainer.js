import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProfilePhotoModalView from "../ProfilePhotoModal/ProfilePhotoModalView";

const ProfilePhotoModalContainer = (props) => {
  console.log(props)
  const navigate = useNavigate();

  const [profilePhotoUrl,setProfilePhotoUrl ] = useState("")

  useEffect(() => {
    setProfilePhotoUrl(URL.createObjectURL(props.selectedFile))
    props.handleUploadComplete(URL.createObjectURL(props.selectedFile))
  }, [props.selectedFile])
  

  return <ProfilePhotoModalView navigate={navigate} onClose = {props.CloseModal} profilePhotoUrl = {profilePhotoUrl}/>;
};

export default ProfilePhotoModalContainer;
