import React from 'react'
import styles from './SearchItem.module.scss';

const SearchItem = ({ children }) => {
  return (
    <div className={styles.search}>
      {children}
    </div>
  )
}

export { SearchItem };