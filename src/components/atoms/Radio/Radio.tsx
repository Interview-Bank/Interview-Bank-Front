import React from 'react'

type RadioProps = {
  id                        : string;
  name                      : string;
  type                      : string;
  searchRadio               : string;
  isChangeCreatedDateRadio  : (value: string) => void;
}

const Radio = ({id, name, type, searchRadio, isChangeCreatedDateRadio}: RadioProps) => {
  return (
    <label htmlFor={id} >
      <input type="radio" name={type} id={id} checked={searchRadio===id ? true : false } onChange={()=> isChangeCreatedDateRadio(id)} />
      {name}
    </label>
  )
}

export { Radio };