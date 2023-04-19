import React, {useState, useEffect} from 'react'
import UserSettingView from './UserSettingView'
import { getCookieValue } from '../../api/loginApi';
import axios from 'axios';
import { setTokenHeaders } from '../../api/apiGetTokenHeader';
import { useNavigate } from 'react-router-dom';

const UserSettingContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  const [userNickname, setUserNickname] = useState("")
  const [passwordUpdatedAt, setPasswordUpdatedAt] = useState("")
  const headers = setTokenHeaders();
  const navigate = useNavigate()

  

  useEffect(() => {
    const getmydata = async () => {
    try {
      console.log(headers)
      const response = await axios.get(
        `https://bstaging.interviewbank.net/account/me`,
        {headers}
      );
      console.log(response)
      setPasswordUpdatedAt(response.data.passwordUpdatedAt)
      setUserEmail(response.data.email)
      setUserNickname(response.data.nickname)
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
      navigate = {navigate}
    />
  )
}

export default UserSettingContainer