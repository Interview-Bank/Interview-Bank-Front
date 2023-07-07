import Image from 'next/image';
import Link from 'next/link';
import { checkCookieExistence, deleteCookie, getCookieValue, setTokenHeaders } from '@/pages/api/login/loginCheck';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss';
import Logo from 'public/logo.svg';
import { LoginModal } from '@/components/molecules/LoginModal';
import { isLogout, isReceiveProfileImage } from '@/pages/api/login/loginProcess';
import { Profile } from '@/components/molecules/Profile';
import { Button, Input } from '@/components/atoms';

const Header = () => {
  const [modalActive, setModalActive] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null)
  const router = useRouter();
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    // const cookieExists = checkCookieExistence();
    setCookie(checkCookieExistence());
    // isReceiveProfileImage()
    //   .then(response => setProfileImageUrl(response));
  }, [])

  useEffect(() => {
    modalActive
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [modalActive])

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

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.nav__logo}>
          <Link href="/">
            <Image
              src={Logo} alt="logo"
              // onClick={() => router("/")}
            />
          </Link>
        </div>
        <ul className={styles.search}>
          <li>인터뷰</li>
          <li>문의하기</li>
          <li>인터뷰뱅크 소개</li>
        </ul>
        <div className={(cookie && profileImageUrl) ? styles.nav__menu : `${styles.nav__menu} ${styles.login}`}>
          {(cookie && profileImageUrl)
            ?
              <>
                <Button
                  value="글쓰기"
                  onClickEvent={linkWritePage}
                  image={"WRITE"}
                  imgWidth={20}
                  imgHeight={20}
                />
                <Profile profileImageUrl={profileImageUrl} logoutEvent={isLogoutEvent} />
              </>
            :
              <>
                <Button value="회원가입" onClickEvent={linkRegisterPage}/>
                <Button value="로그인" onClickEvent={openLoginPopupEvent}/>
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
    </header>
  )
}

export { Header };