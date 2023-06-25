import React from 'react'
import styles from './Banner.module.scss';
import BannerImage from 'public/banner.png';
import Image from 'next/image';

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
        <Image src={BannerImage} alt="배너이미지" />
      </div>
    </div>
  )
}

export { Banner }