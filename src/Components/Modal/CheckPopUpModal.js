import React from "react";
import styled from "styled-components";

const CheckPopUpModal = (props) => {
  const CloseModal = () => {
    props.CloseModal();
  };
  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { CloseModal })
  );
  return (
    <ModalWrapper>
      <ModalBody>
        {childrenWithProps}
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

const ModalBody = styled.div`
  position: absolute;
  width: 240px;
  height: 150px;
  padding: 40px 40px 10px 40px;
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

export default CheckPopUpModal;
