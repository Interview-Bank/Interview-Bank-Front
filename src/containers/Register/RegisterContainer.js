import React from "react";
import "./registerContainer.css";
const RegisterContainer = () => {
  return (
    <>
      <div className="register-outer-box">
        <div className="register-box-title">
          <h1>회원가입</h1>
        </div>
        <div className="register-inner-box">
          <div className="form-item">
            <p>닉네임</p>
            <input
              className="form-input"
              type="text"
              id="userName"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div className="form-item">
            <p>이메일</p>
            <input
              className="form-input"
              type="text"
              id="userName"
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div className="form-item">
            <p>비밀번호</p>
            <input
              className="form-input"
              type="password"
              id="userPassword"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className="form-item">
            <p>비밀번호 확인</p>
            <input
              className="form-input"
              type="password"
              id="userPasswordRe"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </div>
          <div className="form-item">
            <input
              type="button"
              className="register-confirm-button"
              value="회원가입"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterContainer;
