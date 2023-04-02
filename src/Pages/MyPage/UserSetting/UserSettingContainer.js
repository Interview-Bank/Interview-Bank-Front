import React, {useState} from 'react'
import UserSettingView from './UserSettingView'
import { getCookieValue } from '../../api/loginApi';


const UserSettingContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const userNickname = getCookieValue("user=");
  console.log(document.cookie)
  return (
    <UserSettingView
      userNickname = {userNickname}
      editModal = {editModal}
      setEditModal = {setEditModal}
    />
  )
}

export default UserSettingContainer