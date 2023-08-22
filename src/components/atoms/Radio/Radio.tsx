import React from 'react'

type RadioProps = {
  id: number;
}

const Radio = ({id, name, type, searchRadio, isChangeCreatedDateRadio}: RadioProps) => {
  return (
    <label htmlFor={id} onClick={()=> isChangeCreatedDateRadio(id)}>
      <input type="radio" name={type} id={id} checked={searchRadio===id ? true : false } />
      {name}
    </label>
  )
}

export { Radio };