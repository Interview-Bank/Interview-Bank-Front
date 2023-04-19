import React from 'react'

const SearchItem = ({children}) => {
  return (
    <div className="search__item">
      {children}
      <style jsx>{`
        .search__item {
          position: relative;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default SearchItem;