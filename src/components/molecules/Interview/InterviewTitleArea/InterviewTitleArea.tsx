import { Button } from '@/components/atoms/Button';
import { Title } from '@/components/atoms/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from './InterviewTitleArea.module.scss';
import ScrapIcon from 'public/Icons/scrapIcon.png';
import UserIcon from 'public/Icons/userIcon.png';
import { checkCookieExistence, getCookieValue } from '@/pages/api/login/loginCheck';
import { LoginModal } from '../../LoginModal';

type Props = {}

const InterviewTitleArea = ({ title, date, accountId }) => {
  const [userId, setUserId] = useState(0);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {    
    if (checkCookieExistence()) {
      setUserId(Number(getCookieValue('userId')));
    }
  }, [])
  const loginCheck = () => {
    if (checkCookieExistence()) {
      
    } else {
      openLoginPopupEvent();
    }
  }

  const openLoginPopupEvent = () => {
    setModalActive(prev => !prev);
  }
  return (
    <div className={styles.title}>
      <div className={styles.title__area}>
        <Title title={title} />
        <div className={styles.btn__area} onClick={()=>loginCheck()}>
          <Image src={ScrapIcon} alt="답변 작성 아이콘" width={18} height={18} />
          <Button value='답변 작성하기' onClickEvent={()=> {return}}/>
        </div>
      </div>
      <div className={styles.user}>
        <ul>
          <li>
            <Image src={UserIcon} alt="유저 아이콘" width={18} height={18} />

          </li>
          {date
            && <li>{date}</li>
          }
        </ul>
        {userId === accountId
          &&  <div className={styles.menu}>
                <span>수정하기</span>
                <span>삭제하기</span>
              </div>
        }
      </div>
      {modalActive
        && <LoginModal onClickEvent={openLoginPopupEvent} active={modalActive} />
      }
      
    </div>
  )
}

export { InterviewTitleArea };