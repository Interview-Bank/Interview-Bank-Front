import { Button } from '@/components/atoms/Button';
import { Title } from '@/components/atoms/Title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from './InterviewTitleArea.module.scss';
import ScrapIcon from 'public/Icons/scrapIcon.png';
import UserIcon from 'public/Icons/userIcon.png';
import { checkCookieExistence, getCookieValue } from '@/pages/api/login/loginCheck';
import { LoginModal } from '../../LoginModal';
import { deleteInterview, isScrap } from '@/pages/api/InterView/Interview';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { confirmModalSlice } from '@/redux/confirmModalReducer';

const InterviewTitleArea = ({ title, date, accountId, toggle, toggleSwitch, propsValue = '' }) => {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {    
    if (checkCookieExistence()) {
      setUserId(Number(getCookieValue('userId')));
    }
  }, [])

  const loginCheck = () => {
    if (checkCookieExistence()) {
      isScrap(Number(router.query.id))
        .then(response => {
          dispatch(confirmModalSlice.actions.OPEN(
            {
              title: "스크랩 되었습니다.",
              content: "페이지로 이동할까요?",
              value: "scrap"
            }
          ));
        })
        .catch(e => new Error(`Error : ${e}`));
      // setScrapModal(true);
      
    } else {
      openLoginPopupEvent();
    }
  }

  const moveOriginalInterview = () => {
    router.push(`/interview/${accountId}`)
  }

  const openLoginPopupEvent = () => {
    setModalActive(prev => !prev);
  }

  const deletePost = async () => {

    if (window.confirm("해당 글을 삭제하시겠습니까?")) {
      deleteInterview(router.query.id)
        .then(response => { window.alert("삭제되었습니다."); router.push('/') })
        .catch(reject => console.log(reject))
      // try {
      //   await axios.delete(`${InterviewBaseUrl}/${interview_id}`, { headers });
      //   window.alert("삭제되었습니다.")
      //   navigate('/');
      // } catch (err) {
      //   console.error(err);
      // }
    }
  }

  const editPost = () => {
    router.push(`/post/${router.query.id}`);
  }

  return (
    <div className={styles.title}>
      <div className={styles.title__area}>
        <Title title={title} />
        <div className={styles.btn__area}>
          <div className={styles.btn} onClick={() => toggleSwitch()}>
            {/* <input type="checkbox" id="toggle" hidden />  */}
            <label htmlFor="toggle" className={toggle ? `${styles.toggle} ${styles.active}` : styles.toggle}>
              <span className={toggle ? `${styles.btn__toggle} ${styles.active}` : styles.btn__toggle}></span>
            </label>
            <Button value='챗 GPT 답변보기' onClickEvent={()=> {return}}/>
          </div>
          {propsValue === 'scrap'
            ? <div className={`${styles.btn} ${styles.btn__scrap}`} onClick={() => moveOriginalInterview()}>
                <Image src={ScrapIcon} alt="원본 글 이동 아이콘" width={18} height={18} />
                <Button value='원본 글로 이동하기' onClickEvent={()=> {return}}/>
              </div>
            : <div className={styles.btn} onClick={() => loginCheck()}>
                <Image src={ScrapIcon} alt="답변 작성 아이콘" width={18} height={18} />
                <Button value='답변 작성하기' onClickEvent={()=> {return}}/>
              </div>
          }
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
                <span onClick={()=>editPost()}>수정하기</span>
                <span onClick={()=>deletePost()}>삭제하기</span>
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