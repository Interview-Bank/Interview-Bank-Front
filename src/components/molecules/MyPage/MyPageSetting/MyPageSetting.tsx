import React, { useEffect, useState } from 'react'
import styles from './MyPageSetting.module.scss'
import { Label } from '@/components/atoms/Label/Label'
import { FecthUserData } from '@/pages/api/MyPage/myUser'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/Button'
import Image from 'next/image'

interface UserDataProps {
  imageUrl: string;
  nickname: string;
  email: string;
  passwordUpdatedAt: string;
}

const initUserData = {
  imageUrl: '',
  nickname: '',
  email: '',
  passwordUpdatedAt: '',
}

const MyPageSetting = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataProps>({...initUserData});

  useEffect(() => {
    FecthUserData()
      .then(response => setUserData(response))
      .catch(reject => console.log(reject));
  },[])
  return (
    <div className={styles.page__body}>
      <h4>기본 정보</h4>
      <div className={styles.user}>
        <Image src={userData.imageUrl} width={'97'} height={'97'} alt='Profile Image'/>
        {/* <Profile profileImageUrl={userData ? userData.imageUrl : ''} /> */}
        <div className={styles.user__info}>
          <div className={styles.user__edit}>
            <Label text={userData ? `${userData.nickname}님` : ''} />
            <Button value='수정' onClickEvent={()=>{}}/>
          </div>
          <div className={styles.user__email}>
            <Label text='이메일' />
            <Label text={userData ? `${userData.email}` : ''} />
          </div>
        </div>
      </div>
      <h4>비밀번호</h4>
      <div className={styles.passwd}>
        <Label text={userData ? `최근 변경일 : ${userData.passwordUpdatedAt}` : ''} />
        <Button value='비밀번호 변경' onClickEvent={()=>{router.push('/reset-password')}}/>
      </div>
    </div>
  )
}

export { MyPageSetting };