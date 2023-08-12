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
import { bringScrapListData } from '@/pages/api/Scrap/scrapFetchDataAPI';

interface InterviewTitleAreaProps {
  title             : string;
  date              : string;
  accountId         : number;
  toggle           ?: boolean;
  toggleSwitch     ?: () => void;
  propsValue       ?: string;
  writerNickname    : string;
  view              : number;
  btnArea          ?: boolean;
}

const InterviewTitleArea = ({
  title,
  date,
  accountId,
  toggle,
  toggleSwitch,
  propsValue            = '',
  writerNickname,
  view,
  btnArea               = true
}: InterviewTitleAreaProps) => {
  const router = useRouter();
  const [ userId        , setUserId       ] = useState(0);
  const [ modalActive   , setModalActive  ] = useState(false);
  const [ mobileToggle  , setMobileToggle ] = useState(false);
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
              title           : "스크랩 되었습니다.",
              content         : "페이지로 이동할까요?",
              value           : "scrap",
              yes             : "확인",
              no              : "취소",
              onClickEvent    : isMoveScrapPage
            }
          ));
        })
        .catch(e => new Error(`Error : ${e}`));
      // setScrapModal(true);
      
    } else {
      openLoginPopupEvent();
    }
  }

  const isMoveScrapPage = () => {
    dispatch(confirmModalSlice.actions.CLOSE());
    bringScrapListData()
      .then(response => router.push(`/scraps/${response.scraps[0].scrapId}`))
      .catch(reject => console.log(reject));
    // router.push(`/scraps/${scrapList[0].scrapId}`);
  }

  const moveOriginalInterview = () => {
    dispatch(confirmModalSlice.actions.OPEN(
      {
        title         : "저장하고 원본글로 넘어갈까요?",
        content       : "글을 저장하지 않고 원본글을 보면 작성하신 글이 삭제 됩니다. 저장할까요?",
        value         : "scrap",
        yes           : "저장하기",
        no            : "취소",
        onClickEvent  : () => router.push(`/interview/${accountId}`)
      }
    ));
  }

  const openLoginPopupEvent = () => {
    setModalActive(prev => !prev);
  }

  const deletePost = async () => {

    if (window.confirm("해당 글을 삭제하시겠습니까?")) {
      deleteInterview(router.query.id)
        .then(response => { window.alert("삭제되었습니다."); router.push('/') })
        .catch(reject => console.log(reject));
    }
  }

  const editPost = () => {
    router.push(`/post/${router.query.id}`);
  }

  return (
    <div className={styles.title}>
      <div className={styles.title__area}>
        <Title title={title} />
        {btnArea && toggleSwitch
          &&  <>
                <div className={styles.btn__area}>
                  <div className={styles.btn} onClick={() => toggleSwitch()}>
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
                <div className={styles.mobile__btn__area} onClick={() => setMobileToggle((prev) => !prev)}>
                  <button className={styles.mobile__dott__menu}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  {mobileToggle
                    &&  <div className={`${styles.mobile__gpt__toggle} ${propsValue !== 'scrap' ? styles['mobile__gpt__toggle--active'] : undefined}`}>
                          <div className={styles.btn} onClick={() => toggleSwitch()}>
                            <label htmlFor="toggle" className={toggle ? `${styles.toggle} ${styles.active}` : styles.toggle}>
                              <span className={toggle ? `${styles.btn__toggle} ${styles.active}` : styles.btn__toggle}></span>
                            </label>
                            <Button value='챗 GPT 답변보기' onClickEvent={()=> {return}}/>
                          </div>
                          {propsValue !== 'scrap'
                            && <div className={styles.btn} onClick={() => loginCheck()}>
                                <Image src={ScrapIcon} alt="답변 작성 아이콘" width={18} height={18} />
                                <Button value='답변 작성하기' onClickEvent={()=> {return}}/>
                              </div>
                          }
                        </div>
                  }
              </div>
          </>
        }
      </div>
      <div className={styles.user}>
        <ul>
          <li>
            <Image src={UserIcon} alt="유저 아이콘" width={20} height={20} />
            {writerNickname}
          </li>
          <li></li>
          <li>{date}</li>
          <li></li>
          <li>{view} View</li>
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