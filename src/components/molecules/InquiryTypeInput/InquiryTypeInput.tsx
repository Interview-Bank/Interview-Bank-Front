import { Input } from '@/components/atoms';
import React from 'react'
import styles from './InquiryInput.module.scss';

interface InquiryTypeInputProps {
  title: string;
  name: string;
  value: string;
  type?: string;
  placeholder: string;
  maxLength: number;
  onChangeEvent: (name:string, value:string) => void;
  errorMessage?: string;
}

const InquiryTypeInput = ({ title, name, value, type = 'text', placeholder, maxLength, onChangeEvent, errorMessage }: InquiryTypeInputProps) => {
  return (
    <div className={styles.form}>
      {title &&
        <h4>{title}</h4>
      }
      {/* 문의유형 타입 선택 와야함 */}
    </div>    
  )
}

export { InquiryTypeInput };