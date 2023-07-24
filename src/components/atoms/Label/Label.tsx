import React from 'react';
import styles from './Label.module.scss';

interface LabelProps {
  text: string;
  color: string;
}

const Label = ({ text, color = 'black' }: LabelProps) => {
  return (
    <span className={styles[`font--${color}`]}>{text}</span>
  )
}

export { Label };