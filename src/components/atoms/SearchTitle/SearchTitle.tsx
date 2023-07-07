import React from 'react'
import { Input } from '../Input';
import styles from './SearchTitle.module.scss';

type Props = {}

const SearchTitle = ({isChangeTitle}) => {
  return (
    <div className={styles.title}>
      <Input
        placeholder='내용을 검색하세요.'
        maxLength={128}
        onChange={isChangeTitle}
        name='SearchTitle'
        type='text'
      />
    </div>
  )
}

export { SearchTitle };