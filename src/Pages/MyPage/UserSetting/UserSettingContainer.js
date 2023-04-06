import React, {useState, useEffect} from 'react'
import UserSettingView from './UserSettingView'
import { getCookieValue } from '../../api/loginApi';
import axios from 'axios';
import { setTokenHeaders } from '../../api/apiGetTokenHeader';


const UserSettingContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  const [passwordUpdatedAt, setPasswordUpdatedAt] = useState("")
  const userNickname = getCookieValue("user=");
  const headers = setTokenHeaders();

  useEffect(() => {
    const response = axios.get(
      `https://bstaging.interviewbank.net/account/me`
    );
    console.log(response)
    setPasswordUpdatedAt(response.data.passwordUpdatedAt)
    setUserEmail(response.data.email)
  }, [])
  
  return (
    <UserSettingView
      userEmail = {userEmail}
      passwordUpdatedAt = {passwordUpdatedAt}
      userNickname = {userNickname}
      editModal = {editModal}
      setEditModal = {setEditModal}
    />
  )
}

export default UserSettingContainer