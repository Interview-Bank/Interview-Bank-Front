import React, { useEffect, useState } from 'react';
import ArrowLeft from '../../Assets/Images/Icons/arrow_left.png';
import ArrowRight from '../../Assets/Images/Icons/arrow_right.png';

const Pagination = ({ totalPage, limit, page, setPage }) => {
  // 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  // useEffect(() => {
  //   if (page % limit === 1) {
  //     setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
  //   } else if (page % limit === 0) {
  //     setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
  //   }
  // }, [page]);

  // useEffect(() => {
  //   const slicedPageArray = sliceArrayByLimit(totalPage, limit);
  //   setTotalPageArray(slicedPageArray);
  //   setCurrentPageArray(slicedPageArray[0]);
  // }, [totalPage]);

  return (
    <div>
      {/* <FaAngleDoubleLeft onClick={() => setPage(1)} disabled={page === 1} /> */}
      <img src={ArrowLeft} alt="전 페이지" onClick={() => setPage(page - 1)} disabled={page === 1}/>
      <button>
        {currentPageArray?.map((i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </button>
        ))}
      </button>
      <img src={ArrowRight} alt="다음 페이지" onClick={() => setPage(page + 1)} disabled={page === totalPage}/>
      {/* <FaAngleDoubleRight
        onClick={() => setPage(totalPage)}
        disabled={page === totalPage}
      /> */}
    </div>
  );
};

export default Pagination;