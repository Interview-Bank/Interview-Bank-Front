import React from 'react'
import styles from './InterviewView.module.scss';
import { InterviewContentProps } from '../InterviewContent/InterviewContent';

const InterviewView = ({ content }: InterviewContentProps) => {
  return (
    <div className={styles.view}>
      <li>{content}</li>
    </div>
  )
}

export default InterviewView