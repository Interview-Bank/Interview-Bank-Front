import React from 'react';
import Google from '@/public/Icons/google.png';
import Naver from '@/public/Icons/naver.png';
import Kakao from '@/public/Icons/kakaotalk.png';
import Email from '@/public/Icons/email.png';

export interface IconProps {
  icon: 'GOOGLE'
        | 'NAVER'
        | 'KAKAO'
        | 'EMAIL'
}

const isDiscernIcon = ({ icon }: IconProps) => {
  switch (icon) {
    case 'GOOGLE':
      return Google;
    case 'NAVER':      
      return Naver;
    case 'KAKAO':
      return Kakao;
    case 'EMAIL':
      return Email;
    default:
      break;
  };
}

const Icon = ({ icon }: IconProps) => {
  const Icon = isDiscernIcon({ icon });
  return (
    <>
      {/* <Icon /> */}
    </>
  );
};

export { Icon };