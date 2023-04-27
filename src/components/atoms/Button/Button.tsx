import Image from 'next/image';
import React from 'react'
import styles from './Button.module.scss';
import Google from 'public/Icons/google.png';
import Kakao from 'public/Icons/kakaotalk.png';
import Naver from 'public/Icons/naver.png';
import { IconImage } from '../IconImage';

interface ButtonProps {
  value: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  image?: "GOOGLE"
  | "KAKAO"
  | "NAVER"
  | undefined;
  width?: string;
  height?: string;
  onClickEvent: () => void;
}

// const isDiscernIcon = ({ image }: ButtonProps) => {
//   switch (image) {
//     case 'GOOGLE':
//       return Google;
//     case 'KAKAO':      
//       return Kakao;
//     case 'NAVER':
//       return Naver;
//     default:
//       break;
//   };
// }

const Button = ({ value, color = 'black', backgroundColor = 'white', borderColor = 'black', onClickEvent, image,
  width = 'default', height = 'default' }: ButtonProps) => {
  // const Image: any = isDiscernIcon({ image });
  const btnClassName = `${styles[`font-${color}`]} ${styles[`background-${backgroundColor}`]} ${styles[`border-${borderColor}`]} 
                        ${styles[`width-${width}`]} ${styles[`height-${height}`]}`;
  return (
    <button
      className={`${styles.button} ${btnClassName}`}
      onClick={()=>onClickEvent()}
    >
      {image
        && <IconImage icon={image} width={50} height={50} />
      }
      {/* {image
        && <Image src={Image} alt="버튼 이미지" width="24" height="24" />} */}
      {value}
    </button>
  )
}

export { Button };