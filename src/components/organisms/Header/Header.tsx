import React, { useCallback, useEffect, useState }            from 'react';
import { useRouter }                                          from 'next/router';
import { Button, IconImage, Input, Label }                    from '@/components/atoms';
import { LoginModal, Profile }                                from '@/components/molecules';
import { checkCookieExistence, deleteCookie, getCookieValue } from '@/pages/api/useCookie';
import { isLogout, isReceiveProfileImage }                    from '@/pages/api/login/loginProcess';
import { HomeMenuListArray }                                  from '@/pages/api/Home/HomeMenuListArray';
import styles                                                 from './Header.module.scss';

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
  
  const moveRegisterPage = () => {
    router.push('/register');
    setMobileToggle(false);
  };

  const moveWritePage = () => router.push('/post');

  const moveInfoPage = () => router.push('/info');

  const moveSearchPage = () => {
    router.push('/search');
    setMobileToggle(false);
  }

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
      })
      .catch(reject => console.log(reject))
  }, [router])

  const openLoginPopupEvent = () => {
    setModalActive((prev)=>!prev);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.nav__logo} onClick={() => router.push('/')}>
          <IconImage icon={"LOGO"} width={236} height={31}/> 
        </div>
        <ul className={styles.nav__menu}>
          {HomeMenuListArray?.map((menu) => (
            <li key={menu.id} onClick={() => router.push(`${menu.path}`)}>{menu.name}</li>
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
                <div className={styles.mobile__logo}>
                  <IconImage icon={"LOGO"} /> 
                </div>
                <div className={styles.mobile__form}>
                  <div className={styles.mobile__user}>
                    {cookie
                      ? <>
                          <h3><Label text={getCookieValue('user')} /> 님</h3>
                          <Button value={'로그아웃'} onClickEvent={submitLogout}/>
                        </>
                      : <p>로그인 후 다양한 인터뷰를 확인하세요.</p>
                    }
                  </div>
                  <div className={styles.mobile__btn__area}>
                    {(cookie && profileImageUrl)
                      ?
                        <>
                          <ul>
                            <li>프로필</li>
                            <li>내 인터뷰</li>
                            <li></li>
                          </ul>
                      
                        </>
                      :
                        <>
                          <Button
                            value             = "로그인"
                            onClickEvent      = {openLoginPopupEvent}    
                          />
                          <Button
                            value             = "회원가입"
                            onClickEvent      = {moveRegisterPage}
                          />
                          {modalActive
                            && <LoginModal onClickEvent={openLoginPopupEvent} active={modalActive} />
                          }
                        </>
                    }
                  </div>
                  <ul className={styles.mobile__menu__list}>
                    <li onClick={() => moveSearchPage()}>인터뷰</li>
                    <li>문의하기</li>
                    <li onClick={() => moveInfoPage()}>인터뷰뱅크 소개</li>
                  </ul>
                </div>
              </div>
            </div>
        }
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