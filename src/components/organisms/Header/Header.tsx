import Image from 'next/image';
import Link from 'next/link';
import { checkCookieExistence, deleteCookie, setTokenHeaders } from '@/pages/api/login/loginCheck';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss';
import Logo from 'public/logo.svg';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';
import { LoginModal } from '@/components/molecules/LoginModal';
import { isLogout } from '@/pages/api/login/loginProcess';

type Props = {}

const Header = (props: Props) => {
  const [modalActive, setModalActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState(false)
  // const token = useSelector((state) => state.Auth.token);
  const [profileImageUrl, setProfileImageUrl] = useState(null)

  const router = useRouter();


  const ProfileRef = useRef(null)
  const UserButtonRef = useRef(null)
  // const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cookie, setCookie] = useState(false);
  let headers;

  useEffect(() => {
    // const cookieExists = checkCookieExistence();
    setCookie(checkCookieExistence());
    headers = setTokenHeaders();
  }, [])
  
  const linkRegisterPage = () => {
    router.push('/register');
  }

  const linkWritePage = () => {
    router.push('/post');
  }

  const isLogoutEvent = useCallback(async () => {
    isLogout(headers)
      .then(response => console.log(response))
      .catch(reject => console.log(reject))

    // await axios
    //   .post(process.env.NEXT_PUBLIC_API_URL + "/account/logout", {}, { headers })
    //   .then((res) => {
    //     deleteCookie('authToken');
    //     deleteCookie('userId');
    //     deleteCookie('user');
    //     if ((window.location.pathname === '/post' || window.location.pathname === '/my-posts' || window.location.pathname === '/scrap')) router.push('/');
    //     else window.location.reload();
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, [])

  const openLoginPopupEvent = () => {
    setModalActive((prev)=>!prev);
  }

  // const checkCookie = () => {
  //   const cookieExists = checkCookieExistence();
  //   setCookie(cookieExists);
  //   setLoading(false);
  // };
  // useEffect(() => {

  //   function handleClickOutside(event) {
  //     if (
  //       UserButtonRef.current && !UserButtonRef.current.contains(event.target) && ProfileRef.current && !ProfileRef.current.contains(event.target)
  //     ) {
  //       setProfile(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   checkCookie();

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ProfileRef, setProfile, loading]);

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
          {cookie
            ?
              <>
              <Button value="글쓰기" backgroundColor='blue' color='white' borderColor='0' onClickEvent={linkWritePage} image={"WRITE"} imgWidth={20} imgHeight={20} />
              <Button value="로그아웃" onClickEvent={isLogoutEvent}/>
              </>
            :
              <>
                <Button value="회원가입" onClickEvent={linkRegisterPage}/>
                <Button value="로그인" backgroundColor='blue' color='white' borderColor='0' onClickEvent={openLoginPopupEvent}/>
                {modalActive
                  && <LoginModal onClickEvent={openLoginPopupEvent}/>
                }
              </>
          }
        </div>
      </nav>

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