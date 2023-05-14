import React from 'react'
import { Input } from '../Input';
import styles from './SearchTitle.module.scss';

type Props = {}

const SearchTitle = ({isChangeTitle}) => {
  return (
    <div className={styles.title}>
      <Input placeholder='내용을 검색하세요.'/>
    </div>
    // <div className={styles.title}>
    //   <h5>{title}</h5>
		// 	<span onClick={() => resetSearchParams(field)}>초기화 하기</span>
    // </div>
  )
}

export { SearchTitle };