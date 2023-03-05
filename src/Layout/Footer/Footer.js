import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <h5>Copyright 2023. Interview Bank all rights reserved</h5>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  text-align: center;
  position: absolute;
  background-color: #f5f5f5;
  width: 100%;
  height: 150px;
  left: 0;
  bottom: auto;
  margin-top: 100px;
  border-top: 1px solid #f1f1f1;
  > h5 {
    margin-top: 120px;
    color: #b5b5b5;
  }
`;

export default Footer;
