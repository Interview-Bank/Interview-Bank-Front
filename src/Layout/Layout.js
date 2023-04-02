import React from "react";
import styled from "styled-components";
import HeaderContainer from "./Header/HeaderContainer";

const Layout = (props) => {
  console.log(window.location.pathname.includes("interview"))
  console.log(props);
  return (
    <>
      <HeaderContainer />
      <MainWrapper locationHref={(window.location.pathname === "/post" || window.location.pathname === "/select")}>{props.children}</MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  position: relative;
  height: fit-content;
  top: 80px;
  min-height: ${(props) => props.locationHref ? "calc(100vh - 100px - 60px - 151px);" : "calc(100vh - 100px - 151px);"}
`;

export default Layout;
