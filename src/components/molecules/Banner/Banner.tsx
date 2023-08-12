import React from 'react'
import styles from './Banner.module.scss';
import BannerImage from 'public/banner.png';
import Image from 'next/image';
import { IconImage } from '@/components/atoms';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__area}>
        <h1>
          대기업 면접 정보<br />
          인터뷰 뱅크에서!
        </h1>
        <h3>
          여러 기업들의 면접 정보를 한 눈에!
        </h3>
        <div className={styles.banner__images}>
          <IconImage icon={'BANNER-CALENDAR'} width={103} height={103}/>
          <IconImage icon={'BANNER-PHONE'} width={278} height={254}/>
          <IconImage icon={'BANNER-SMILE'} width={113} height={113}/>
          <IconImage icon={'BANNER-MONEY'} width={85} height={109}/>
        </div>
      </div>
    </div>
  )
}

export { Banner }