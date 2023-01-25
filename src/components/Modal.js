import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ComponentsStyles/modal.css";

const Modal = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();
  const realId = "test@naver.com";
  const realPw = "12345678";

  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          X
        </button>
        <div className="Content">
          <h1 className="modalTitle">Interview Bank</h1>
          <div>
            <input
              className="input-login"
              placeholder="이메일"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              className="input-login"
              placeholder="비밀번호"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="modal-login-button"
            onClick={(e) => {
              if (realId === email && realPw === password) {
                e.stopPropagation();
              } else {
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
              }
            }}
          >
            로그인
          </button>
        </div>
        <div className="login-modal-options">
          <input
            type="button"
            className="register-option"
            value="회원가입"
            onClick={() => {
              navigate(`/register-email`);
            }}
          />
          <input
            type="button"
            className="find-password-option"
            value="
            비밀번호 찾기"
          />
        </div>
        <div className="additional-login">
          <p>다른 계정으로 로그인하기</p>
          <input className="social-login-button" type="button" value="kakao" />
          <input className="social-login-button" type="button" value="naver" />
          <input className="social-login-button" type="button" value="google" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
