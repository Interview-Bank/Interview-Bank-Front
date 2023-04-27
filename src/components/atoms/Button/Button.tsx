import React from 'react'
import styles from './Button.module.scss';

interface ButtonProps {
  value: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  onClickEvent: () => void;
}

const Button = ({ value, color = "black", backgroundColor = 'white', borderColor = "black", onClickEvent }: ButtonProps) => {
  const btnClassName = `${styles[`font-${color}`]} ${styles[`background-${backgroundColor}`]} ${styles[`border-${borderColor}`]}`;
  return (
    <button
      className={`${styles.button} ${btnClassName}`}
      onClick={()=>onClickEvent()}
    >
      {value}
    </button>
  )
}

export { Button };