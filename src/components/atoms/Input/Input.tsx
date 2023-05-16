import Image from 'next/image';
import React from 'react'
import styles from './Input.module.scss';
import Search from 'public/Icons/search.png';

interface InputProps {
  placeholder: string;
  maxLength: number;
  name: string;
  onChange: (name: string, value: string) => void;
  type: string;
}

const Input = ({placeholder, maxLength, name, onChange, type}: InputProps) => {
  return (
    <>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={(e)=>{onChange(name, e.target.value)}}
        maxLength={maxLength ? maxLength : 9999}
      />
      <Image
        className={styles.image}
        src={Search}
        alt="search"
      />
    </>
  )
}

export { Input };