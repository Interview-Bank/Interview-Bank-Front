import React from 'react'
import styles from './SearchItem.module.scss';

interface SearchItemProps {
  children: React.ReactNode;
  type: string;
}

const SearchItem = ({ children, type = '' }: SearchItemProps) => {
  return (
    <div className={type === 'title' ? styles.search : `${styles.search} ${styles.area}`}>
      {children}
    </div>
  )
}

export { SearchItem };