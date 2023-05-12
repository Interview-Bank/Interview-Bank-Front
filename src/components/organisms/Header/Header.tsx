import Image from 'next/image';
import Link from 'next/link';
import { checkCookieExistence, deleteCookie, getCookieValue, setTokenHeaders } from '@/pages/api/login/loginCheck';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss';
import Logo from 'public/logo.svg';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';
import { LoginModal } from '@/components/molecules/LoginModal';
import { isLogout, isReceiveProfileImage } from '@/pages/api/login/loginProcess';
import { Profile } from '@/components/molecules/Profile';

const Header = () => {
  const [modalActive, setModalActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null)
  const router = useRouter();
  const [cookie, setCookie] = useState(false);
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    // const cookieExists = checkCookieExistence();
    setCookie(checkCookieExistence());
    // isReceiveProfileImage()
    //   .then(response => setProfileImageUrl(response));
  }, [])

  useEffect(() => {
    if (cookie) {
      isReceiveProfileImage()
        .then(response => setProfileImageUrl(response))
    }
  }, [cookie, profileImageUrl])
  
  const linkRegisterPage = () => {
    router.push('/register');
  }

  const linkWritePage = () => {
    router.push('/post');
  }

  const isLogoutEvent = useCallback(async () => {
    isLogout()
      .then(response => {
        deleteCookie('authToken');
        deleteCookie('userId');
        deleteCookie('user');
        setCookie(false);
        if ((window.location.pathname === '/post' || window.location.pathname === '/my-posts' || window.location.pathname === '/scrap')) router.push('/');
        // else window.location.reload();
      })
      .catch(reject => console.log(reject))
  }, [])

  const openLoginPopupEvent = () => {
    setModalActive((prev)=>!prev);
  }

  // const checkCookie = () => {
  //   const cookieExists = checkCookieExistence();
  //   setCookie(cookieExists);
  //   setLoading(false);
  // };

  return (
    <header className={styles.header}>
      <nav className={styles.nav__bar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src={Logo} alt="logo"
              // onClick={() => router("/")}
            />
          </Link>
        </div>
        <div className={styles.search}>
          <Input placeholder='기업별 면접 후기를 검색해보세요'/>
        </div>
        <div className={styles.navigation}>
          {(cookie && profileImageUrl)
            ?
              <>
                <Button value="글쓰기" backgroundColor='blue' color='white' borderColor='0' onClickEvent={linkWritePage} image={"WRITE"} imgWidth={20} imgHeight={20} />
                <Profile profileImageUrl={profileImageUrl} logoutEvent={isLogoutEvent} />
              </>
            :
              <>
                <Button value="회원가입" onClickEvent={linkRegisterPage}/>
                <Button value="로그인" backgroundColor='blue' color='white' borderColor='0' onClickEvent={openLoginPopupEvent}/>
                {modalActive
                  && <LoginModal onClickEvent={openLoginPopupEvent} active={modalActive} />
                }
              </>
          }
        </div>
      </nav>
      <div className={styles.mobile__search}>
        <Input placeholder='기업별 면접 후기를 검색해보세요'/>
      </div>

        {/* 
            : <>
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
      </HeaderContents> */}
    </header>
  )

  // useEffect(() => {
  //   if (jwtUtils.isAuth(token)) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, [token]);

  // const headers = setTokenHeaders();
  // useEffect(() => {
  //   const getmydata = async () => {
  //     try {
  //       console.log(headers)
  //       const response = await axios.get(
  //         `https://bstaging.interviewbank.net/account/me`,
  //         {headers}
  //       );
  //       console.log(response)
  //       setProfileImageUrl(response.data.imageUrl)
  //       return response.data.imageUrl;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getmydata();
  // },[headers])
}

export { Header };