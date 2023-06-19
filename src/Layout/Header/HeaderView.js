import React, {useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../Assets/Images/logo.svg";
import Search from "../../Assets/Images/search.png";
import Modal from "../../Components/Modal/LoginModal";
import ProfileContainer from "../../Components/Profile/ProfileContainer";
import { checkCookieExistence } from '../../Pages/api/loginApi';
import LoginContainer from "../../Pages/Login/LoginContainer";
import WriteIconUrl from "../../Assets/Icons/WriteIcon.png"


const HeaderView = ({ loginModal, setLoginModal, profile, setProfile, profileImageUrl }) => {
  const navigate = useNavigate();
  const ProfileRef = useRef(null)
  const UserButtonRef = useRef(null)
  const [loading, setLoading] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);


  const [cookie, setCookie] = useState(false);
  const checkCookie = () => {
    const cookieExists = checkCookieExistence();
    setCookie(cookieExists);
    setLoading(false);
  };
  useEffect(() => {

    function handleClickOutside(event) {
      if (
        UserButtonRef.current && !UserButtonRef.current.contains(event.target) && ProfileRef.current && !ProfileRef.current.contains(event.target)
      ) {
        setProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    checkCookie();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ProfileRef, setProfile, loading]);

  return (
    <HeaderWrapper>
      <HeaderContents>
        <LogoBox>
          <img src={Logo} alt="logo" onClick={() => navigate("/")} />
        </LogoBox>
        <MenuWrapper>
          <MenuContent onClick = {() => navigate("/search")}>인터뷰</MenuContent>
          <MenuContent onClick = {() => navigate("/inquiry")}>문의하기</MenuContent>
          <MenuContent>인터뷰뱅크 소개</MenuContent>
        </MenuWrapper>
        <NavigationBox>
        {loading === false &&
          (!cookie
            ? <>
                <RegisterPageButton
                  onClick={() => {
                    navigate("/select");
                  }}
                >
                  회원가입
                </RegisterPageButton>

                <LoginButton
                  onClick={() => {
                    setLoginModal(true);
                  }}
                >
                  로그인
                </LoginButton>
                {loginModal && (
                  <Modal
                    CloseModal={() => {
                      setLoginModal(!loginModal);
                    }}
                  >
                    <LoginContainer />
                  </Modal>
                )}
              </>
            : <>
                <WriteButtonWrapper onClick={() => navigate("/post")}>
                  <WriteIcon
                    src = {WriteIconUrl}
                    alt = "WriteIcon"/>
                  <WriteButton>글쓰기</WriteButton>
                </WriteButtonWrapper>

                <ProfilePhoto 
                  src={profileImageUrl} 
                  alt="ProfilePhoto"
                  ref = {UserButtonRef}
                  onClick={() => {
                    setProfile(!profile);
                  }}onLoad={() => setImageLoaded(true)}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
                {!imageLoaded && <ProfilePhotoPlaceholder />}
                <ProfileWrapper ref={ProfileRef}>
                {profile && <ProfileContainer profileImageUrl = {profileImageUrl} />}
                </ProfileWrapper>
              </>
          )
        }
        </NavigationBox>
      </HeaderContents>
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.2);
  z-index: 7;
`;

const HeaderContents = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  justify-content: space-between;
  width: 80%;
  max-width: 1276px;
  height: 100%;
  align-items: center;
  margin : 0 auto;
`;

const LogoBox = styled.div`
  position: relative;
  width: 270px;
  height: 32px;

  cursor: pointer;
  align-items: center;
  justify-content: center;

`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 50px;

  width: fit-content;
  height: 20px;


`

const MenuContent = styled.div`
  width: fit-content;
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #252525;
  white-space: nowrap;
  cursor: pointer;
`

const NavigationBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: auto;

`;

const LoginButton = styled.button`
  width: 80px;
  height: 35px;
  font-weight: 700;
  border-radius: 4px;
  background-color: #2e55e7;
  border: 3px solid #2e55e7;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  padding: 5px 15px;
  margin-left: 10px;
`;

const RegisterPageButton = styled.button`
  width: 80px;
  height: 35px;  
  background-color: #f9f9f9;
  cursor: pointer;
  color: #5C5C5C;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #5C5C5C;
  border-radius: 4px;
  margin-left: 15px;
  :hover {
    color: #252525;
  }
`;

const WriteButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction : row;
  align-items: center;
  justify-content: center;

  width: 101px;
  height: 35px;

  border-radius: 4px;
  background-color: #2e55e7;
  border: none;

  cursor: pointer;

  margin-right: 25px;
`;
const WriteIcon = styled.img`
  position: relative;
  width: 24px;
  height: 24px;

  margin-right: 12px;
`;
const WriteButton = styled.div`
  position: relative;
  width: 47px;
  height: 20px;

  font-weight: 700;
  font-size: 14px;
  color: #fff;
`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 40px;
  height: 40px;

  cursor: pointer;
`

const ProfileWrapper = styled.div`
  position: fixed;
`;

const ProfilePhotoPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f9f9f9; // You can choose a color for the placeholder
`;

export default HeaderView;
