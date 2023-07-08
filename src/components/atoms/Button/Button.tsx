import React from 'react'
import styles from './Button.module.scss';
import { IconImage } from '../IconImage';

interface ButtonProps {
  value: string;
  image?: "GOOGLE"
  | "KAKAO"
  | "NAVER"
  | "EMAIL"
  | "WRITE"
  | undefined;
  imgWidth?: number;
  imgHeight?: number;
  onClickEvent: () => void;
}

const Button = ({ value, image, imgWidth = 24, imgHeight = 24, onClickEvent }: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={()=>onClickEvent()}>
      {image
        && <IconImage icon={image} width={imgWidth} height={imgHeight} />
      }
      {value}
    </button>
  )
}

export { Button };