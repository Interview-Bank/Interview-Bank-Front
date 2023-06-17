import React, {useState, useCallback, useEffect} from "react";
import FindPasswordView from "./FindPasswordView";
import axios from "axios";
import { useDispatch } from "react-redux";


const FindPasswordContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/account/";
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);


  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;

    if (!validateEmail(currEmail)) {
      setEmailMsg("올바른 형식의 이메일을 입력해주세요.");
    } else {
      setEmailMsg("올바른 이메일 형삭");
      setIsEmailValid(true)
      setEmail(currEmail)
    }
  }, []);
  const handleEmailTransmit = async () => {
    let body = {
      email: email
    };
    try {
      const response = await axios.post(API_URL + "reset-password/send-email", body);
      console.log(response)
      dispatch({
				type: "OPEN",
				payload: { title: "이메일로 링크를 전송하였습니다.", content: "이메일을 확인해주세요." },
			});
    } catch (e) {
      dispatch({
				type: "OPEN",
				payload: { title: "이메일을 찾을 수 없습니다.", content: "다시 입력해주세요." },
			});
      console.log(e)
    }
  }
  return (
    <FindPasswordView 
      onChangeEmail={onChangeEmail}
      isEmailValid = {isEmailValid}
      emailMsg = {emailMsg}
      handleEmailTransmit = {handleEmailTransmit}
    />
    
    );
};

export default FindPasswordContainer;