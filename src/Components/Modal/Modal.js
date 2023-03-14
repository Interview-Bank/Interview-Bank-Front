import React from "react";
import styled from "styled-components";

const Modal = (props) => {
  const CloseModal = () => {
    props.CloseModal();
  };

  return (
    <ModalWrapper>
      <ModalBody>
        <ModalCloseButton onClick={CloseModal}>✕</ModalCloseButton>
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

const ModalCloseButton = styled.button`
  font-weight: 400;
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: #999999;
  font-size: 16px;
  background-color: #fff;
  z-index: 2;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const ModalBody = styled.div`
  position: absolute;
  width: 330px;
  height: 430px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
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

export default Modal;
