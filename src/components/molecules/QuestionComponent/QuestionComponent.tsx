import Image from 'next/image';
import React, { useState } from 'react';
import styles from './QuestionComponent.module.scss';
import ArrowDown from "public/Icons/arrow_down.png";
import ArrowUp from "public/Icons/arrow_up.png";

const QuestionComponent = ({
  item,
  index,
  answers,
  inputValues,
  inputRefs,
  handleInputChange,
  handleInputLimit,
  toggleAnswerInput,
  gptToggle
}) => {
  return (
    <div className={styles.question}>
      <div className={styles.content__area}>
        <div className={styles.content}>{item?.content}</div>
        <Image src={answers[index] ? ArrowUp : ArrowDown} alt='답글쓰기 아이콘' onClick={() => toggleAnswerInput(index)} />
      </div>
      {answers[index]
        &&  <div className={styles.input}>
              {gptToggle
                &&  <>
                      <div className={styles.line}></div>
                      <textarea
                        name        = "gptAnswer"
                        readOnly    = {true}
                        value       = {item?.gptAnswer}
                        placeholder = '답변을 입력해주세요.'
                        onChange    = {(e) => handleInputChange(index, e)}
                        onInput     = {(e) => handleInputLimit(e)}
                      />
                    </>
              }
              {inputRefs
                &&  <>
                      <div className={styles.line}></div>
                      <textarea
                        ref         = {(el) => (inputRefs.current[index] = el)}
                        name        = "answer"
                        id          = "answer"
                        value       = {inputValues[index]}
                        placeholder = '답변을 입력해주세요.'
                        onChange    = {(e) => handleInputChange(index, e)}
                        onInput     = {(e) => handleInputLimit(e)}
                      />
                    </>
              }
            </div>
      }
    </div>
  )
}

export { QuestionComponent };