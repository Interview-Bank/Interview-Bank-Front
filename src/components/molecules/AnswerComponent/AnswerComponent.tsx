import React, { useState } from 'react';
import styles from './AnswerComponent.module.scss';

const AnswerComponent = ({ item }) => {
  console.log(item);
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`${styles.answer} ${toggle ? styles[`answer--active`] : undefined}`}>
      <div className={styles.answer__area}>
        {item.content}
      </div>
      <div
        className = {`${styles.answer__arrow} ${toggle ? styles['answer__arrow--active'] : undefined}`}
        onClick   = {() => setToggle((prev) => !prev)}
      >
        <span></span>
        <span></span>
      </div>
      {toggle
        &&  <>
              <div className={styles.answer__divide}></div>
              <div> {/** textarea 들고오기 */}
                {item.gptAnswer}
              </div>
            </>
      }
    </div>
  )
}

export { AnswerComponent };