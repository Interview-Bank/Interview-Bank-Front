import React from 'react'

const SearchCategoryCheckBoxItem = ({ category, name }) => {
  return (
    <li>
      <label for={category} style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em"}}>
        <input type="checkbox" name={category} value={category} />
        {name}
      </label>
    </li>
  )
}

export default SearchCategoryCheckBoxItem