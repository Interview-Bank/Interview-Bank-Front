import Image from 'next/image';
import React from 'react'
import styles from './Input.module.scss';
import Search from 'public/Icons/search.png';

interface InputProps {
  placeholder: string;
}

const Input = ({placeholder}: InputProps) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
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