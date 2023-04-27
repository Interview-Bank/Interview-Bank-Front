import Image from 'next/image';
import React from 'react'
import styles from './RegisterButtonType.module.scss';
import Google from 'public/Icons/google.png';
import Kakao from 'public/Icons/kakaotalk.png';
import Naver from 'public/Icons/naver.png';
import Email from 'public/Icons/email.png';

interface IconProps {
  icon: 'GOOGLE'
      | 'KAKAO'
      | 'NAVER'
      | 'EMAIL';
}

interface RegisterButtonTypeProps extends IconProps{
  content: string;
  onClickEvent: () => void;
}

const isDiscernIcon = ({ icon }: IconProps) => {
  switch (icon) {
    case 'GOOGLE':
      return Google;
    case 'KAKAO':      
      return Kakao;
    case 'NAVER':
      return Naver;
    case 'EMAIL':
      return Email;
    default:
      break;
  };
}

const RegisterButtonType = ({ icon, onClickEvent, content }: RegisterButtonTypeProps) => {
  const Icon: any = isDiscernIcon({icon});
  return (
    <div className={styles.button} onClick={() => onClickEvent()}>
      <Image 
        width="32"
        height="32"
        src={ Icon }
        alt="회원가입 아이콘"
      />
      {content}
    </div>
  )
}

export { RegisterButtonType };