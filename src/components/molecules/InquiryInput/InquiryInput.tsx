import { Input } from '@/components/atoms';
import React from 'react'
import styles from './InquiryInput.module.scss';

interface InquiryInputProps {
  title: string;
  name: string;
  value: string;
  type?: string;
  placeholder: string;
  maxLength: number;
  onChangeEvent: (name:string, value:string) => void;
  errorMessage?: string;
}

const InquiryInput = ({ title, name, value, type = 'text', placeholder, maxLength, onChangeEvent, errorMessage }: InquiryInputProps) => {
  return (
    <div className={styles.form}>
      {title &&
        <h4>{title}</h4>
      }
      <Input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        onChangeEvent={onChangeEvent}
      />
      {errorMessage &&
        <div className={styles.error}>
          {errorMessage}
        </div>
      }
    </div>    
  )
}

export { InquiryInput };