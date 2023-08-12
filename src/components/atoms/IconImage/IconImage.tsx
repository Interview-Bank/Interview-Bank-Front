import React              from 'react'
import Image              from 'next/image';

import Google             from 'public/Icons/google.png';
import Kakao              from 'public/Icons/kakaotalk.png';
import Naver              from 'public/Icons/naver.png';
import Email              from 'public/Icons/email.png';

import Write              from 'public/Icons/writeIcon.png';
import Search             from 'public/Icons/search.png';

import BannerPhone        from '@/assets/images/banner/banner-phone.svg';
import BannerMoney        from '@/assets/images/banner/banner-money.svg';
import BannerCalendar     from '@/assets/images/banner/banner-calendar.svg';
import BannerSmile        from '@/assets/images/banner/banner-smile.svg';

import ArrowDown          from 'public/Icons/arrow_down.png';

interface IconProps {
  icon: string;
}

interface IconImageProps extends IconProps {
  width       ?: number;
  height      ?: number;
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
    
    case 'BANNER-PHONE':
      return BannerPhone;
    case 'BANNER-MONEY':
      return BannerMoney;
    case 'BANNER-CALENDAR':
      return BannerCalendar;
    case 'BANNER-SMILE':
      return BannerSmile;
    
    case 'WRITE':
      return Write;
    case 'SEARCH':
      return Search;
    
    case 'ARROW-DOWN':
      return ArrowDown;
    default:
      break;
  };
}

const IconImage = ({
  icon,
  width       = 24,
  height      = 24
}: IconImageProps) => {
  const Icon: any = isDiscernIcon({icon});
  return (
    <>
      <Image src={Icon} alt="아이콘" width={width} height={height} />
    </>
  )
}

export { IconImage };