import { ProfileModal } from '@/components/atoms/ProfileModal';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import styles from './Profile.module.scss';
import { useRouter } from 'next/router';

export interface ProfileProps {
  profileImageUrl   : string;
  logoutEvent       : () => void;
}

const Profile = ({ profileImageUrl, logoutEvent }: ProfileProps) => {
  const router = useRouter();
  const ProfileRef = useRef(null);
  const UserButtonRef = useRef(null);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    // function handleClickOutside(event) {
    //   if (
    //     UserButtonRef.current
    //       && !UserButtonRef.current.contains(event.currentTarget)
    //       && ProfileRef.current
    //       && !ProfileRef.current.contains(event.currentTarget)
    //   ) {
    //     setProfile(false);
    //   }
    // }

    // document.addEventListener("mousedown", handleClickOutside);
    // // checkCookie();

    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
    return () => {
      setProfile(false);
    }
  }, [router.asPath])

  return (
    <>
      <div className={styles.profile} onClick={()=> setProfile(prev=>!prev)} ref={UserButtonRef}>
        <Image src={profileImageUrl} alt="ProfilePhoto" width={25} height={25} />
      </div>
      <div className={styles.profile__area} ref={ProfileRef}>
        {profile && <ProfileModal profileImageUrl={profileImageUrl} logoutEvent={logoutEvent} setProfile={() => setProfile} />}
      </div>
    </>
  )
}

export { Profile };