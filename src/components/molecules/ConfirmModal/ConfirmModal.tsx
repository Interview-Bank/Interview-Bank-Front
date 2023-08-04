import { bringScrapListData } from '@/pages/api/Scrap/scrapFetchDataAPI';
import { confirmModalSlice } from '@/redux/confirmModalReducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfirmModal.module.scss';
import { Button } from '@/components/atoms';

interface RootState<T> {
  [x: string]: T;
}

interface ConfirmModalStateType {
  active    : boolean;
  content  ?: string;
  title    ?: string;
  yes       : string;
  no        : string;
}

const ConfirmModal = () => {
  const { active, title, content, yes, no } = useSelector((state: RootState<ConfirmModalStateType>) => state.confirmModal);
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
          <Button value={no} onClickEvent={() => dispatch(confirmModalSlice.actions.CLOSE())} />
          <Button value={yes} onClickEvent={() => isMoveScrapPage()} />
        </div>
      </div>
    </div>
  )
}

export { ConfirmModal };