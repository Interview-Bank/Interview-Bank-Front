import React from "react";
import styled from "styled-components";
import HeaderContainer from "./Header/HeaderContainer";
import Footer from "./Footer/Footer";
import Modal from '../Components/Modal/Modal';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  console.log(window.location.pathname.includes("interview"))
  console.log(props);
  const modal = useSelector((state) => state.Modal);
  console.log(modal)
  return (
    <>
      <HeaderContainer />
      <MainWrapper locationHref={(window.location.pathname === "/post" || window.location.pathname === "/select")}>{props.children}</MainWrapper>
      <Footer />
      {modal.active && <Modal modal={modal} />}
    </>
  );
};

const MainWrapper = styled.div`
  position: relative;
  top: 100px;
  min-height: ${(props) => props.locationHref ? "calc(100vh - 100px - 60px - 151px);" : "calc(100vh - 100px - 151px);"}
`;

export default Layout;
