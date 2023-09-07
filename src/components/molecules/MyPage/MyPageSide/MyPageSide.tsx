import { Title } from '@/components/atoms/Title';
import Image from 'next/image';
import UserSettingActive from "public/Icons/UserSetting_Active.png"
import UserSettingUnActive from "public/Icons/UserSetting_UnActive.png"
import MyPostActive from "public/Icons/MyPost_Active.png"
import MyPostUnActive from "public/Icons/MyPost_UnActive.png"
import React from 'react'
import styles from './MyPageSide.module.scss';
import { useRouter } from 'next/router';

const MyPageSide = () => {
  const router = useRouter();

  const linkUserSettingPage = () => {
    router.push('/mypage/userSetting');
  }

  const linkMyPostPage = () => {
    router.push('/mypage/my-post');
  }

  const linkMyScrapPage = () => {
    router.push('/mypage/my-scrap');
  }  

  return (
    <div className={styles.side}>
      <Title title="내 정보 관리" />
      <div className={styles.side__menu}>
        <div
          className={router.query.my === 'userSetting' ? `${styles.content} ${styles.active}` : styles.content}
          onClick={() => { linkUserSettingPage() }}
        >
          {router.query.my === 'userSetting'
            ? <Image src={UserSettingActive} alt="계정관리 아이콘" width={24} height={24} />
            : <Image src={UserSettingUnActive} alt="계정관리 아이콘" width={24} height={24} />
          }
          <div className={styles.content__menu}>계정 관리</div>
        </div>
        <div
          className={router.query.my === 'my-post' ? `${styles.content} ${styles.active}` : styles.content}
          onClick={() => { linkMyPostPage() }}
        >
          {router.query.my === 'my-post'
            ? <Image src={MyPostActive} alt="계정관리 아이콘" width={24} height={24} />
            : <Image src={MyPostUnActive} alt="계정관리 아이콘" width={24} height={24} />
          }
          <div className={styles.content__menu}>게시글 관리</div>
        </div>
        {/* <div
          className={router.query.my === 'my-scrap' ? `${styles.content} ${styles.active}` : styles.content}
          onClick={() => { linkMyScrapPage() }}
        >
          {router.query.my === 'my-scrap'
            ? <Image src={MyScrapActive} alt="계정관리 아이콘" width={24} height={24} />
            : <Image src={MyScrapUnActive} alt="계정관리 아이콘" width={24} height={24} />
          }
          <div className={styles.content__menu}>작성한 답변글</div>
        </div> */}
      </div>
    </div>
  )
}

export { MyPageSide };