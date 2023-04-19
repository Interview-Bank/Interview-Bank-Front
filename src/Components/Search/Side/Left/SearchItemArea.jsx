import React from 'react'

const SearchItemArea = ({children}) => {
  return (
    <div className='search__item-area'>
      {children}
      <style jsx>{`
        .search__item-area {
          width: calc(100% - 50px);
          background-color: white;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
          padding: 0px 24px 16px;
        }
      `}</style>
    </div>
  )
}

export default SearchItemArea;