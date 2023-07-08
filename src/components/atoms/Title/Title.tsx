import React from 'react';
// import styles from './Title.module.scss';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h1>{title}</h1>
  )
}

export { Title };