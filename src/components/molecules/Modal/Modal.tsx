import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.scss';
import { modalSlice } from '@/redux/modalReducer';

interface RootState<T> {
  [x: string]: T;
}

interface ModalStateType {
  active			: boolean;
  content		 ?: string;
  title			 ?: string;
}

const Modal = memo(() => {
	const { active, title, content } = useSelector((state: RootState<ModalStateType>) => state.modal);
	const dispatch = useDispatch();
	useEffect(() => {
		active
      ? document.documentElement.style.overflow = "hidden"
      : document.documentElement.style.overflow = "unset"
    return () => {
      document.documentElement.style.overflow = "unset"
    }
	},[active, title, content])
	return (
		<div className={styles.modal__area}>
			<div className={styles.background}></div>
			<div className={styles.whiteground}>
				<p className={styles['title-blue']}>
					{title}
				</p>
				{content 
					&& <p className={styles[`title-grey`]}>
								{content}
							</p>
				}
				<button className={styles.btn__close} onClick={() => dispatch(modalSlice.actions.CLOSE())}>확인</button>
			</div>
    </div>
  )
})

export { Modal };