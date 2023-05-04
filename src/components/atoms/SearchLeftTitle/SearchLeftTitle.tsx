import React from 'react'
import styles from './SearchLeftTitle.module.scss';

type Props = {}

const SearchLeftTitle = ({title, field, resetSearchParams}) => {
  return (
    <div className={styles.title}>
      <h5>{title}</h5>
			<span onClick={() => resetSearchParams(field)}>초기화 하기</span>
    </div>
  )
}

export { SearchLeftTitle };