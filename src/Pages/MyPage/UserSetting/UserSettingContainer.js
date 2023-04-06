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
    const getmydata = async () => {
    try {
      const response = await axios.get(
        `https://bstaging.interviewbank.net/account/me`,
        {headers}
      );
      console.log(response)
      setPasswordUpdatedAt(response.data.passwordUpdatedAt)
      setUserEmail(response.data.email)
    } catch (error) {
      console.error(error);
    }
  }
  getmydata();
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