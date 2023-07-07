import React from 'react'

import Google from 'public/Icons/google.png';
import Kakao from 'public/Icons/kakaotalk.png';
import Naver from 'public/Icons/naver.png';
import Email from 'public/Icons/email.png';

import Write from 'public/Icons/writeIcon.png';
import Search from 'public/Icons/search.png';

import Image from 'next/image';

interface IconProps {
  icon: 'GOOGLE'
  | 'KAKAO'
  | 'NAVER'
  | 'EMAIL'
  | 'WRITE'
  | 'SEARCH';
  
}

interface IconImageProps extends IconProps {
  width: number;
  height: number;
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
    
    case 'WRITE':
      return Write;
    case 'SEARCH':
      return Search;
    default:
      break;
  };
}

const IconImage = ({ icon, width, height }: IconImageProps) => {
  const Icon: any = isDiscernIcon({icon});
  return (
    <>
      <Image src={Icon} alt="아이콘" width={width} height={height} />
    </>
  )
}

export { IconImage };