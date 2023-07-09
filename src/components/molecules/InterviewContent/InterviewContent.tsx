import React from 'react'
import styles from './InterviewContent.module.scss';

interface InterviewContentProps {
  content: string;
}

const InterviewContent = ({ content }: InterviewContentProps) => {
  return (
    <div className={styles.content}>
      <li>{content}</li>
    </div>
  )
}

export { InterviewContent };