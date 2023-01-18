import React from "react";
import './modal.css';

function Modal({ onClose }) {
  const handleClose = () => {
    onClose?.();
  };
  return (
      <div className="ModalWrapper">
        <div className="ModalBorder">
          <button className="close-button" onClick={handleClose}>
            x
          </button>
          <div className="Content">
            <h1>Interview Bank</h1>
          <div className="input-box-email">
            <h1>이메일</h1>
            <input placeholder="example@interviewbank.com" type="text"></input>
          </div>
          <div className="input-box-password">
            <h1>비밀번호</h1>
            <input placeholder="비밀번호를 입력해주세요." type="text"></input>
          </div>
            <button className="login-button">로그인</button>
          </div>
        </div>
      </div>
  );
}

export default Modal;