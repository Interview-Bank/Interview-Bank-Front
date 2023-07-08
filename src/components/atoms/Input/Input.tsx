import React from 'react'
import styles from './Input.module.scss';

interface InputProps {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  onChangeEvent: (name: string, value: string) => void;
  onKeyDown?: boolean;
  onKeyDownEvent?: () => void;
}

const Input = ({
  name,
  value,
  type = 'text',
  placeholder,
  maxLength,
  onChangeEvent,
  onKeyDown = false,
  onKeyDownEvent
}: InputProps) => {
  const keyPressDownEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    (e.key === 'Enter' && onKeyDownEvent) && onKeyDownEvent();
  }

  return (
    <input
      className={styles.input}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      maxLength={maxLength ? maxLength : 9999}
      onChange={(e) => { onChangeEvent(name, e.target.value) }}
      onKeyDown={
        onKeyDown
          ? (e) => {keyPressDownEnterKey(e)}
          : () => {}
      }
    />
  )
}

export { Input };