import React from 'react'

type Props = {}

const Radio = ({id, name, type, searchRadio, isChangeCreatedDateRadio}) => {
  return (
    <label htmlFor={id} onClick={()=> isChangeCreatedDateRadio(id)}>
      <input type="radio" name={type} id={id} checked={searchRadio===id ? true : false } />
      {name}
    </label>
  )
}

export { Radio };