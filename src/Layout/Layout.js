import React from "react";
import styled from "styled-components";
import HeaderContainer from "./Header/HeaderContainer";
import Footer from "./Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <HeaderContainer />
      <MainWrapper>{props.children}</MainWrapper>
      <Footer />
    </>
  );
};

const MainWrapper = styled.div`
  position: relative;
  top: 100px;
`;

export default Layout;
