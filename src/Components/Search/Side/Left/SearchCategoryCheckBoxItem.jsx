import React from 'react'

const SearchCategoryCheckBoxItem = ({ category, name, categoryDivide, isChangeSelectCategories }) => {
  return (
    <li>
      <label for={categoryDivide} style={{ width: "100%", fontSize: "0.83em", display: "block"}} onClick={()=>isChangeSelectCategories(category)}>
        <input type="checkbox" name={name} value={category} id={categoryDivide} />
        {name}
      </label>
    </li>
  )
}

export default SearchCategoryCheckBoxItem