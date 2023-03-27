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
  min-height: calc(100vh - 100px - 151px);
`;

export default Layout;
