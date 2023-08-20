import React      from 'react';
import styles     from './Label.module.scss';

interface LabelProps {
  text    : string;
}

const Label = ({ text }: LabelProps) => {
  return (
    <span>{text}</span>
  )
}

export { Label };