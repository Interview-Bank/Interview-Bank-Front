import React from 'react';
import Image from 'next/image';
import DeleteButton from "public/Icons/delete.png";
import { Button } from '../Button';
import styles from './PostWrite.module.scss';

const PostWrite = ({inputs, onRemove, onChange, handleInputLimit}) => {
  return (
    <div className={styles.post}>
      {inputs.map((input) => (
        <div className={styles.post__insert} key={input.questionsId}>
          <div className={styles.post__input}>
            <textarea
              name="content"
              onChange={(e) => onChange(input.questionsId, e)}
              onInput={(e) => handleInputLimit(e)}
              value={input.content}
              placeholder="인터뷰를 입력해주세요."
              rows={1}
              // autoComplete="off"
            />
            <Button value={null} type={'DELETE'} onClickEvent={() => onRemove(input.questionsId)}/>
          </div>
        </div>
      ))}
      <style jsx>{`

        .insert__input {
          position: relative;
          width: 100%;
          // min-height: calc(88px - 32 * 2px);
          height: 100%;
          // max-height: calc(133px - 32 * 2px);
          margin-bottom: 20px;
          border: 0;
          border-image: initial;
          border-left: 16px solid rgb(46, 85, 231);
          background-color: rgb(255, 255, 255);
          font-weight: 700;
          color: rgb(37, 37, 37);
          font-size: 1rem;
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px 0px;
          padding: 0px 50px;
          outline: none;
        }

        .insert__input > textarea {
          width: calc(100% - 24px);
          // min-height: calc(88px - 32 * 2px);
          max-height: calc(133px - 32 * 2px);
          // height: 100%;
          border: 0;
          background-color: #fff;
          font-weight: 700;
          color: #000;
          font-size: 1rem;
          border-radius: 8px;
          outline: none;
          resize: none;
          overflow: auto;
          font-family: 'Noto Sans KR';
          margin: 32px 0 30px;
        }

        .insert__input > textarea::-webkit-scrollbar {
          width: 6px;
          background: #DDDDDD;
          border-radius: 20px;
          display: block;
        }

        .insert__input > textarea::-webkit-scrollbar-thumb {
          width: 6px;
          background: #2E55E7;
          border-radius: 20px;
        }
      `}</style>
		</div>
	);
}

export { PostWrite };