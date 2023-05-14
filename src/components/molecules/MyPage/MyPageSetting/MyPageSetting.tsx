import React from 'react'
import styles from './MyPageSetting.module.scss'

type Props = {}

const MyPageSetting = (props: Props) => {
  return (
    <div className={styles.page__body}>
      <h4>기본 정보</h4>
    </div>
  )
}

export { MyPageSetting };