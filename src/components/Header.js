import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.svg";
import "./ComponentsStyles/header.css";
import Modal from "../components/Modal";
import Search from "../images/search.png";
const Header = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="header-wrapper">
        <div className="contents">
          <div className="logo-box">
            <img
              src={Logo}
              alt="logo"
              onClick={() => {
                navigate(`/`);
              }}
            />
          </div>
          <nav className="navigation-bar">
            <input className="search-bar" type="text" />
            <img className="search-icon" src={Search} alt="search" />
            <input
              className="register-button"
              type="button"
              value="회원가입"
              onClick={() => {
                navigate(`/register-email`);
              }}
            />
            <input
              className="login-button"
              type="button"
              value="로그인"
              onClick={() => setModal(!modal)}
            />
            {modal && <Modal closeModal={() => setModal(!modal)} />}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
