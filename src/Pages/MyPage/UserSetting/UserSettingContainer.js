import React, {useState, useEffect, Suspense} from 'react'
import UserSettingView from './UserSettingView'
import { useNavigate } from 'react-router-dom';
import { FetchUserData } from '../../api/FetchUserData';

const UserSettingContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate()

  const [data, setData] = useState(null)

  useEffect(()=> {
    FetchUserData().then((fetchedData) => {
      setData(fetchedData)
    });
  }, []);

  
  if (!data) {
    return <div></div>;
  }
  
  return (
    <Suspense fallback={<div></div>}>
      <UserSettingView 
        data={data}
        editModal = {editModal}
        setEditModal = {setEditModal}
        navigate = {navigate} 
      />
    </Suspense>
  )
}

export default UserSettingContainer