import React, {useState, useCallback, useEffect} from "react";
import FindPasswordView from "./FindPasswordView";
import axios from "axios";


const FindPasswordContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/account/";

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
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
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
      const response = await axios.post(API_URL + "/account/reset-password/send-email", body);
      console.log(response)
    } catch (e) {
      alert(e.response.data.message + "😭");
    }
  }
  return (
    <FindPasswordView 
    onChangeEmail={onChangeEmail}
    isEmailValid = {isEmailValid}
    emailMsg = {emailMsg}
    />
    
    );
};

export default FindPasswordContainer;
