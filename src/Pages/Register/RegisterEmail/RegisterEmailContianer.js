import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RegisterEmailView from "./RegisterEmailView";
import axios from "axios";

const RegisterEmailContainer = () => {
  const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
  };

  const validateNickname = (nickname) => {
    return nickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,16}$/);
  };

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isConfirmPwd = password === passwordConfirm;
  const isNicknameValid = validateNickname(nickname);

  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailMsg("올바른 이메일 형삭");
    }
  }, []);

  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    setPassword(currPwd);

    if (!validatePwd(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호");
    }
  }, []);

  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currConfirmPwd = e.target.value;
      setPasswordConfirm(currConfirmPwd);

      if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("올바른 비밀번호");
      }
    },
    [password]
  );

  const onChangeNickname = useCallback((e) => {
    const currNickname = e.target.value;
    setNickname(currNickname);

    if (!validateNickname(currNickname)) {
      setNicknameMsg("1글자 이상 16글자 이하로 입력해주세요.");
    } else {
      setNicknameMsg("올바른 닉네임");
    }
  }, []);

  const registerSubmit = async (values) => {
    let body = {
      nickname: nickname,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    try {
      await axios.post(AccountBaseUrl + "/register", body);
      alert("회원가입 성공");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
      alert(e.response.data.message + "😭");
    }
  };

  const isAllValid =
    isEmailValid && isPwdValid && isConfirmPwd && isNicknameValid;

  return (
    <RegisterEmailView
      nicknameMsg={nicknameMsg}
      emailMsg={emailMsg}
      pwdMsg={pwdMsg}
      confirmPwdMsg={confirmPwdMsg}
      onChangeConfirmPwd={onChangeConfirmPwd}
      onChangeEmail={onChangeEmail}
      onChangePwd={onChangePwd}
      onChangeNickname={onChangeNickname}
      isAllValid={isAllValid}
      isNicknameValid={isNicknameValid}
      isEmailValid={isEmailValid}
      isPwdValid={isPwdValid}
      isConfirmPwd={isConfirmPwd}
      registerSubmit={registerSubmit}
    />
  );
};

export default RegisterEmailContainer;
