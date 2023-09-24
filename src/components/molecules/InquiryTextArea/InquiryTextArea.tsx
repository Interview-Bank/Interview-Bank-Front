import { Input } from '@/components/atoms';
import React from 'react'
import styles from './InquiryTextArea.module.scss';

interface InquiryTextAreaProps {
  title: string;
  name: string;
  value: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleInputLimit: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

const InquiryTextArea = ({ title, name, value, type = 'text', placeholder, handleInputLimit, onChange, errorMessage }: InquiryTextAreaProps) => {
  return (
    <div className={styles.inquiry}>
      {title &&
        <h4>{title}</h4>
      }
      <textarea
        name={name}
        onChange={(e) => onChange(e)}
        onInput={(e) => handleInputLimit(e)}
        placeholder={placeholder}
        rows={1}
        // autoComplete="off"
      />

		</div> 
  )
}

export { InquiryTextArea };