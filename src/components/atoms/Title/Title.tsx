import React from 'react';
import styles from './Title.module.scss';

const Title = ({title}: any) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
    </div>
  )
}

export { Title };