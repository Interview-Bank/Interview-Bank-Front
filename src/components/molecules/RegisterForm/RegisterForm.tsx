import { Input } from '@/components/atoms/Input';
import React from 'react'
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
  title: string;
  placeholder: string;
  maxLength: number;
}

const RegisterForm = ({ title, placeholder, maxLength }: RegisterFormProps) => {
  return (
    <div className={styles.form}>
      {title &&
        <h4>{title}</h4>
      }
      <Input placeholder={`${placeholder}`} maxLength={maxLength}/>
    </div>    
  )
}

export { RegisterForm };