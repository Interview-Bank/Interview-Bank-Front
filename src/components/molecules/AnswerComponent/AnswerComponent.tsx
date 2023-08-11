import React, { useState } from 'react';
import styles from './AnswerComponent.module.scss';

interface AnswerComponentProps {
  item: {
    questionId  : number;
    content     : string;
    createdAt   : string;
    deletedAt   : string;
    deletedFlag : boolean;
    gptAnswer   : string;
    updatedAt   : string;
  }
}

const AnswerComponent = ({ item }: AnswerComponentProps) => {
  const [toggle, setToggle] = useState(false);
  console.log(item);
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
              <textarea
                name        = "gptAnswer"
                readOnly    = {true}
                value       = {item?.gptAnswer}
                placeholder = '답변을 입력해주세요.'
                onChange    = {()=>{}}
                onInput     = {()=>{}}
              />
            </>
      }
    </div>
  )
}

export { AnswerComponent };