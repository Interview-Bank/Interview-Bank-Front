import React, { useState, useCallback } from "react";
import axios from "axios";
import ResetPasswordView from './ResetPasswordView'
import { setTokenHeaders } from "../api/apiGetTokenHeader";
import { getCookieValue } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
const ResetPasswordContainer = () => {
    const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
    const headers = setTokenHeaders();
    const token = getCookieValue()
    const navigate = useNavigate()
    


    const validatePwd = (password) => {
        return password
        .toLowerCase()
        .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
    };

    const isPwdValid = validatePwd(password);
    const isConfirmPwd = password === passwordConfirm;//ture or false

    const onChangePwd = useCallback((e) => {
        const currPwd = e.target.value;
        setPassword(currPwd);
    
        if (!validatePwd(currPwd)) {
          setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
        }
      }, []);

    const onChangeConfirmPwd = useCallback(
    (e) => {
        const currConfirmPwd = e.target.value;
        setPasswordConfirm(currConfirmPwd);

        if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
        }
    },
    [password]
    );

    const handleUpdatePassword = async () => {
        let body = {
            newPassword: password,
            newPasswordCheck: passwordConfirm,
          };
        console.log(body)
        try {
          const response = await axios.post(`${AccountBaseUrl}/reset-password`, body, {headers:headers} )

          console.log(response)
        //   navigate("/")  
        } catch (error) {
          console.log(error)
        }
      };
    

  return (
    <ResetPasswordView
        pwdMsg={pwdMsg}
        confirmPwdMsg={confirmPwdMsg}
        onChangeConfirmPwd={onChangeConfirmPwd}
        onChangePwd={onChangePwd}
        isPwdValid={isPwdValid}
        isConfirmPwd={isConfirmPwd}
        handleUpdatePassword = {handleUpdatePassword}
        />
  )
}

export default ResetPasswordContainer