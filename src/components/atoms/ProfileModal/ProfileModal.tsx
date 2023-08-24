import { ProfileProps } from '@/components/molecules/Profile';
import { getCookieValue } from '@/pages/api/login/loginCheck';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import styles from './ProfileModal.module.scss';

interface ProfileModalProps extends ProfileProps {
  setProfile: (value?: boolean) => void;
}

const ProfileModal = ({ profileImageUrl, logoutEvent, setProfile }: ProfileModalProps) => {
  const router    = useRouter();
  const nickname  = getCookieValue('user');

  const linkMyPage = useCallback(() => {
    router.push('/mypage/userSetting');
    setProfile();
  }, []);

  const linkMyPostPage = useCallback(() => {
    router.push('/mypage/my-post');
    setProfile();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.triangle}></div>
      <div className={styles.profile__area}>
        <div className={styles.user}>
          <div className={styles.image__area}>
            <Image src={profileImageUrl} alt="프로필 이미지" width={69} height={69} onClick={()=>linkMyPage()} />
            <div className={styles.nickname} onClick={()=>linkMyPage()}>
              {nickname} 님
            </div>
          </div>
        </div>
        <div className={styles.profile__menu}>
          <div className={styles.profile__item} onClick={() => linkMyPage()}>
            프로필
          </div>
          <div className={styles.profile__item} onClick={() => linkMyPostPage()}>
            내 인터뷰
          </div>
          <div className={styles.profile__item} onClick={() => logoutEvent}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileModal };