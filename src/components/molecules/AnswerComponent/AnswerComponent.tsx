import React, { useState } from 'react';
import styles from './AnswerComponent.module.scss';

const AnswerComponent = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={styles.answer}>
      <div className={styles.answer__area}>
        1
      </div>
      <div
        className = {`${styles.answer__arrow} ${toggle ? styles['answer__arrow--active'] : undefined}`}
        onClick   = {() => setToggle((prev) => !prev)}
      >
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export { AnswerComponent };