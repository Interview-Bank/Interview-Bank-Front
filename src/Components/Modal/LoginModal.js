import React from "react";
import styled from "styled-components";
import XIcon from "../../Assets/Images/Icons/icon_x.png"
const LoginModal = (props) => {
  console.log(props)
  const CloseModal = () => {
    props.CloseModal();
  };

  return (
    <ModalWrapper>
      <ModalBody>
        <ModalCloseButton src={XIcon} onClick={CloseModal}></ModalCloseButton>
        {props.children}
      </ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalCloseButton = styled.img`
  position: absolute;
  top : 24px;
  right: 24px;
  width: 24px;
  height: 24px;
  border: none;
  color: #999999;
  font-size: 16px;
  z-index: 2;
  cursor: pointer;
`;

const ModalBody = styled.div`
  position: absolute;
  width: 410px;
  height: 553px;

  text-align: center;
  background: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 2;
  animation: modaldown 0.25s linear;

  @keyframes modaldown {
    from {
      transform: translateY(-5%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default LoginModal;
