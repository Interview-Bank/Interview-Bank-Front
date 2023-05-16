import { Input } from '@/components/atoms/Input';
import React from 'react'
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
  title: string;
  placeholder: string;
  maxLength: number;
  name: string;
  onChange: (name:string, value:string) => void;
  errorMessage?: string;
  type?: string;
}

const RegisterForm = ({ title, placeholder, maxLength, name, onChange, errorMessage, type }: RegisterFormProps) => {
  return (
    <div className={styles.form}>
      {title &&
        <h4>{title}</h4>
      }
      <Input placeholder={`${placeholder}`} maxLength={maxLength} name={name} onChange={onChange} type={type ? type : 'text'} />
      {errorMessage &&
        // <div className={errorMessage ? styles.error : `${styles.error} ${styles.confirm}`}>
        <div className={styles.error}>
          {errorMessage}
        </div>
      }
    </div>    
  )
}

export { RegisterForm };