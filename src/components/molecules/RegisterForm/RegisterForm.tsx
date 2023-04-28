import { Input } from '@/components/atoms/Input';
import React from 'react'
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
  title: string;
  placeholder: string;
}

const RegisterForm = ({ title, placeholder }: RegisterFormProps) => {
  return (
    <div className={styles.form}>
      <h4>{title}</h4>
      <Input placeholder={`${placeholder}`} />
    </div>    
  )
}

export { RegisterForm };