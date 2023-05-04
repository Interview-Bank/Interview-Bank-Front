import React from 'react'
import styles from './SearchItemArea.module.scss';

type Props = {}

const SearchItemArea = ({children}) => {
  return (
    <div className={styles.area}>
      {children}
    </div>
  )
}

export { SearchItemArea };