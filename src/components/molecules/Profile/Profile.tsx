import Image from 'next/image';
import React from 'react'
import styles from './Profile.module.scss';

type Props = {}

const Profile = (props: Props) => {
  return (
    <div className={styles.profile} onClick={()=> setProfile(!profile)}>
      <Image src={profileImageUrl} alt="ProfilePhoto"/>
    </div>
  )
}

export default Profile