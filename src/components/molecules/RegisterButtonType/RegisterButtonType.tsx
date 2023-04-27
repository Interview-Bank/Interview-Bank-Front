import Image from 'next/image';
import React from 'react'
import styles from './RegisterButtonType.module.scss';
import { IconImage } from '@/components/atoms/IconImage';

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

const RegisterButtonType = ({ icon, onClickEvent, content }: RegisterButtonTypeProps) => {
  return (
    <div className={styles.button} onClick={() => onClickEvent()}>
      <IconImage icon={icon} width={32} height={32} />
      {content}
    </div>
  )
}

export { RegisterButtonType };