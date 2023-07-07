import React from 'react'
import styles from './Input.module.scss';

interface InputProps {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  maxLength: number;
  onChangeEvent: (name: string, value: string) => void;
}

const Input = ({
  name,
  value,
  type = 'text',
  placeholder,
  maxLength,
  onChangeEvent
}: InputProps) => {
  return (
    <input
      className={styles.input}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      maxLength={maxLength ? maxLength : 9999}
      onChange={(e)=>{onChangeEvent(name, e.target.value)}}
    />
  )
}

export { Input };