import React from 'react'

const SearchCategoryCheckBoxItem = ({ category, name }) => {
  return (
    <li>
      <input type="checkbox" name={category} value={category} />
      <label for={category} style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em"}}>
        {name}
      </label>
    </li>
  )
}

export default SearchCategoryCheckBoxItem