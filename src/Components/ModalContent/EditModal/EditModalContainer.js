import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditModalView from './EditModalView';
import { getCookieValue } from '../../../Pages/api/loginApi';
import { setTokenHeaders } from '../../../Pages/api/apiGetTokenHeader';



const EditModalContainer = (props) => {
  //프로필 변경 아이콘 클릭 시 이벤트 함수(api 호출)
  //저장버튼 눌렀을 때 닉네임 변경되는 api 호출을 포함한 이벤트 함수
  const navigate = useNavigate()
  const userNickname = getCookieValue("user=");
  const headers = setTokenHeaders();
  const [ErrorMsg, setErrorMsg] = useState("");
  console.log(props);

  const handleUpdateNickname =  (newNickname) => {
    console.log("jkkkkkkk");
    if (!newNickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,16}$/)){
      setErrorMsg("1글자 이상 16글자 이하로 입력해주세요.");
      return
    }else{
      const updateNickname = async () => {
        try{
          const response = await axios.put(
            `https://bstaging.interviewbank.net/account/nickname`,
            {nickname: newNickname}
          );
          console.log(response)
        }catch(error){
          console.log(error);
        }
      };

      updateNickname();
    }
  }

  const handleNicknameChange = () => {

  }

  return (
    <EditModalView
    handleUpdateNickname = {handleUpdateNickname}
    onClose = {props.CloseModal}
    handleNicknameChange= {handleNicknameChange}
    ErrorMsg = {ErrorMsg}
    userNickname = {userNickname}/>
  )
}

export default EditModalContainer