import React      from 'react';
import styles     from './PostWrite.module.scss';
import { Button } from '../../atoms/Button';

interface PostWriteProps {
  
}

const PostWrite = ({
  inputs,
  onRemove,
  onChange,
  handleInputLimit
}) => {
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
		</div>
	);
}

export { PostWrite };