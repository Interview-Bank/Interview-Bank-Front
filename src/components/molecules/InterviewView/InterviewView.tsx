import React from 'react'
import styles from './InterviewView.module.scss';

type Props = {}

const InterviewView = ({ content }) => {
  return (
    <div className={styles.view}>
      <li>{content}</li>
    </div>
  )
}

export default InterviewView