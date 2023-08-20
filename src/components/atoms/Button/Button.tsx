import React          from 'react'
import styles         from './Button.module.scss';
import { IconImage }  from '../IconImage';

interface ButtonProps {
  value           : string | null;
  type           ?: 'DELETE' | null;
  image          ?: string;
  imgWidth       ?: number;
  imgHeight      ?: number;
  onClickEvent   ?: () => void;
}

const Button = ({
  value,
  type,
  image,
  imgWidth      = 24,
  imgHeight     = 24,
  onClickEvent  = () => {}
}: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={()=>onClickEvent()}>
      {image
        && <IconImage icon={image} width={imgWidth} height={imgHeight} />
      }
      {type
        &&  <>
              <span></span>
              <span></span>
            </>
      }
      {value}
    </button>
  )
}

export { Button };