import { bringScrapListData } from '@/pages/api/Scrap/scrapFetchDataAPI';
import { confirmModalSlice } from '@/redux/confirmModalReducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfirmModal.module.scss';

interface RootState<T> {
  [x: string]: T;
}

interface ConfirmModalStateType {
  active: boolean;
  content?: string;
  title?: string;
}

const ConfirmModal = () => {
  const { active, title, content } = useSelector((state: RootState<ConfirmModalStateType>) => state.confirmModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const [scrapList, setScrapList] = useState([]);

	useEffect(() => {
		active
      ? document.documentElement.style.overflow = "hidden"
      : document.documentElement.style.overflow = "unset"
    return () => {
      document.documentElement.style.overflow = "unset"
    }
  }, [active, title, content])
  
  const isMoveScrapPage = () => {
    dispatch(confirmModalSlice.actions.CLOSE());
    bringScrapListData()
      .then(response => router.push(`/scraps/${response.scraps[0].scrapId}`))
      .catch(reject => console.log(reject));
    // router.push(`/scraps/${scrapList[0].scrapId}`);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.white}>
        <p className={styles['title-blue']}>
          {title}
        </p>
        {content 
					&&  <p className={styles[`title-grey`]}>
								{content}
							</p>
        }
        <div className={styles.btn__area}>
          <button className={styles.btn__close} onClick={() => dispatch(confirmModalSlice.actions.CLOSE())}>취소</button>
          <button className={`${styles.btn__close} ${styles['btn-blue']}`} onClick={() => isMoveScrapPage()}>이동</button>
        </div>
      </div>
    </div>
  )
}

export { ConfirmModal };