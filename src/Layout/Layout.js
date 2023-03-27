import React from "react";
import styled from "styled-components";
import HeaderContainer from "./Header/HeaderContainer";
import Footer from "./Footer/Footer";

const Layout = (props) => {
  console.log(window.location.pathname.includes("interview"))
  console.log(props);
  return (
    <>
      <HeaderContainer />
      <MainWrapper locationHref={window.location.pathname.includes("interview")}>{props.children}</MainWrapper>
      <Footer />
    </>
  );
};

const MainWrapper = styled.div`
  position: relative;
  top: 100px;
  min-height: ${(props) => props.locationHref ? "calc(100vh - 100px - 151px);" : "calc(100vh - 100px - 60px - 151px);"}
`;

export default Layout;
