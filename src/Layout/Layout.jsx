import React from "react";
import styled from "styled-components";
import HeaderContainer from "./Header/HeaderContainer";
import Footer from "./Footer/Footer";
import Modal from "../Components/Modal/Modal";
import { useSelector } from "react-redux";

const Layout = (props) => {
	const modal = useSelector((state) => state.Modal);
	return (
		<>
			<HeaderContainer />
			<MainWrapper
				locationHref={
					window.location.pathname === "/post" ||
					window.location.pathname === "/select"
				}
			>
				{props.children}
			</MainWrapper>
			<Footer />
			{modal.active && <Modal modal={modal} />}
		</>
	);
};

const MainWrapper = styled.div`
	position: relative;
	top: 81px;
	min-height: ${(props) =>
		props.locationHref
    ? "calc(((100vh - 100px) - 60px) - 91px);;"
    : "calc(100vh - 100px - 151px);"};
  font-family: 'Noto Sans KR';
`;

export default Layout;
