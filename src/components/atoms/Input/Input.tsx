import Image from 'next/image';
import React from 'react'
import styles from './Input.module.scss';
import Search from 'public/Icons/search.png';

interface InputProps {
  placeholder: string;
  maxLength: number;
}

const Input = ({placeholder, maxLength}: InputProps) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
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