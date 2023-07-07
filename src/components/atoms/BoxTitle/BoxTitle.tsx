import React from 'react'
import styles from './BoxTitle.module.scss';

interface BoxTitleProps {
  title: string;
  field: string;
  resetSearchParams: (f: any) => {};
}

const BoxTitle = ({title, field, resetSearchParams}: BoxTitleProps) => {
  return (
    <div className={styles.title}>
      <h5>{title}</h5>
			<span onClick={() => resetSearchParams(field)}>초기화 하기</span>
    </div>
  )
}

export { BoxTitle };