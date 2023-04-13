import React from "react";
import styled from "styled-components";

const ProfilePhotoModal = (props) => {
  console.log(props)
  const CloseModal = () => {
    props.CloseModal();
  };
  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { CloseModal })
  );
  return (
    <ModalWrapper>
      <ModalBody>
        <ModalCloseButton onClick={CloseModal}>✕</ModalCloseButton>
        {childrenWithProps}
      </ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 5%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalCloseButton = styled.button`
  font-weight: 400;
  position: absolute;
  width: 24px;
  height: 24px;
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
  box-sizing: border-box;

  position: absolute;
  width: 520px;
  height: 647px;  

  text-align: center;
  background: #FFFFFF;  
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  padding-left: 36px;
  padding-right: 36px;
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

export default ProfilePhotoModal;
