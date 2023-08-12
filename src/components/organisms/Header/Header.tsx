import React, { useCallback, useEffect, useState } from 'react'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import Logo from 'public/logo.svg';

import { Button, Input } from '@/components/atoms';
import { LoginModal, Profile } from '@/components/molecules';

import { checkCookieExistence, deleteCookie } from '@/pages/api/useCookie';
import { isLogout, isReceiveProfileImage } from '@/pages/api/login/loginProcess';
import { HomeMenuListArray } from '@/pages/api/Home/HomeMenuListArray';

const Header = () => {
  const router = useRouter();
  const [ modalActive     , setModalActive     ] = useState(false);
  const [ profileImageUrl , setProfileImageUrl ] = useState(null);
  const [ cookie          , setCookie          ] = useState(checkCookieExistence());
  const [ mobileToggle    , setMobileToggle    ] = useState(false);

  useEffect(() => {
    (modalActive || mobileToggle)
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [modalActive, mobileToggle])

  useEffect(() => {
    if (cookie) {
      isReceiveProfileImage()
        .then(response => setProfileImageUrl(response))
    }
  }, [cookie, profileImageUrl])
  
  const moveRegisterPage = () => router.push('/register');

  const moveWritePage = () => router.push('/post');

  const submitLogout = useCallback(async () => {
    isLogout()
      .then(() => {
        deleteCookie('authToken');
        deleteCookie('userId');
        deleteCookie('user');
        setCookie(false);
        if ((router.pathname === '/post'
              || router.pathname.includes('/my')
              || router.pathname === '/scrap')) router.push('/');
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
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className={styles.nav__menu}>
          {HomeMenuListArray?.map((menu) => (
            <li key={menu.id}>{menu.name}</li>
            ))
          }
        </ul>
        <div
          className={`${styles.nav__form} ${(cookie && profileImageUrl) ? '' : styles.login}`}
        >
          {(cookie && profileImageUrl)
            ?
              <>
                <Button
                  value             = "글쓰기"
                  onClickEvent      = {moveWritePage}
                  image             = {"WRITE"}
                  imgWidth          = {20}
                  imgHeight         = {20}
                />
                <Profile
                  profileImageUrl   = {profileImageUrl}
                  logoutEvent       = {submitLogout}
                />
              </>
            :
              <>
                <Button
                  value             = "회원가입"
                  onClickEvent      = {moveRegisterPage}
                />
                <Button
                  value             = "로그인"
                  onClickEvent      = {openLoginPopupEvent}
                />
                {modalActive
                  && <LoginModal onClickEvent={openLoginPopupEvent} active={modalActive} />
                }
              </>
          }
        </div>
      </nav>
      <div className={styles.mobile__search}>
        <Input
          name              = 'headerSearchInput'
          value             = ''
          type              = 'text'
          onChangeEvent     = {()=>{}}
          placeholder       = '기업별 면접 후기를 검색해보세요'
        />
      </div>
      <div className={styles.mobile__menu}>
        {mobileToggle
        &&  <div className={styles['mobile__menu--active']}>
              <div className={styles.mobile__background}></div>
              <div className={styles.mobile__whiteground}>
                
              </div>
            </div>
        }
        {/* <IconImage icon={'SEARCH'} /> */}
        <Button image={'SEARCH'} value={''} />
        <button className={styles['mobile__menu--hamburger']} onClick={()=>setMobileToggle((prev) => !prev)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
    </header>
  )
}

export { Header };