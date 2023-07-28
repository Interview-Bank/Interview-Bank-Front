import React from 'react'
import styles from './SearchItem.module.scss';

const SearchItem = ({ children, type = '' }) => {
  return (
    <div className={type === 'title' ? styles.search : `${styles.search} ${styles.area}`}>
      {children}
    </div>
  )
}

export { SearchItem };