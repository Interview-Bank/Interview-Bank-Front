import React, {useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../Assets/Images/logo.svg";
import Search from "../../Assets/Images/search.png";
import Modal from "../../Components/Modal/LoginModal";
import ProfileContainer from "../../Components/Profile/ProfileContainer";
import { checkCookieExistence, getCookieValue } from '../../Pages/api/loginApi';
import LoginContainer from "../../Pages/Login/LoginContainer";
import BasicProfilePhoto from "../../Assets/Images/BasicProfilePhoto.png"
import WriteIconUrl from "../../Assets/Icons/WriteIcon.png"


const HeaderView = ({ loginModal, setLoginModal, profile, setProfile, isAuth }) => {
  const navigate = useNavigate();
  const ProfileRef = useRef(null)
  const UserButtonRef = useRef(null)
  const [loading, setLoading] = useState(null);

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
        <SearchBox>
          <SearchInput />
          <img src={Search} alt="search" />
        </SearchBox>
        <NavigationBox>
        {loading === false && // 로딩 상태가 false일 때만 내부 컴포넌트를 렌더링합니다.
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
                  src={BasicProfilePhoto} 
                  alt="BasicProfilePhoto"
                  ref = {UserButtonRef}
                  onClick={() => {
                    setProfile(!profile);
                  }}/>
                <ProfileWrapper ref={ProfileRef}>
                {profile && <ProfileContainer/>}
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
  width: 100%;
  max-width: 1276px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
`;

const LogoBox = styled.div`
  position: relative;
  width: 270px;
  height: 32px;

  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 140px;
`;

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
  border-radius: 7px;
  background-color: #2e55e7;
  border: 3px solid #2e55e7;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  padding: 5px 15px;
  margin-left: 25px;
`;

const RegisterPageButton = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  background-color: #f9f9f9;
  cursor: pointer;
  color: #737373;
  font-size: 14px;
  font-weight: 600;
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

const SearchBox = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  margin-right: 234px;
  > img {
    position: absolute;
    width: 21px;
    top: 12px;
    right: 12px;
    margin: 0;
  }
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  position: relative;
  width: calc(480px - 28px);
  height: 48px;
  border: 2px solid rgb(46, 85, 231);
  border-radius: 26px;
  padding-left: 28px;
  outline: 0;
`;

export default HeaderView;
