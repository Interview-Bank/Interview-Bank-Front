import React, { useState } from 'react'
import ArrowLeft from 'public/Icons/arrow_left.png'
import ArrowRight from 'public/Icons/arrow_right.png'
import styles from './Pagination.module.scss';
import Image from 'next/image'

const Pagination = ({ page, totalPosts, limit, setPage, totalPages }) => {
  const numPages = Math.ceil(totalPosts/limit)
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 5) + 1;
	let lastNum = currPage - (currPage % 5) + 5;

  return (
		<div className={styles.page__area}>
			{/* <div> */}
			<button 
        className={styles.page__move}
				onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
			>
				{page !== 1 
					? <Image src={ArrowLeft} alt="전 페이지" />
					: null
				}
			</button>
			<button
				className={page === firstNum ? `${styles.page__btn} ${styles.active}` : styles.page__btn}
				onClick={() => setPage(firstNum)}
				aria-current={page === firstNum ? "page" : null}>
				{firstNum}
			</button>
			{Array(totalPages-1 < 5 ? totalPages-1 : 4).fill().map((_, i) =>{
				if(i <=2){
					return (
						<button
							className={page === firstNum+1+i ? `${styles.page__btn} ${styles.active}` : styles.page__btn}
							border="true" 
							key={i+1} 
              onClick={() => { setPage(firstNum + 1 + i)}}
							aria-current={page === firstNum+1+i ? "page" : null}>
							{firstNum+1+i}
						</button>
					)
				}
				else if(i>=3){
					return (
						<button 
              className={styles.page__btn}
							border="true" 
							key ={i+1}
							onClick={() => setPage(lastNum)}
							aria-current={page === lastNum ? "page" : null}>
							{lastNum}
						</button>
					)  
				}
			})}
			<button 
				className={styles.page__move}
				onClick={() => {setPage(page+1); setCurrPage(page);}} 
			>
				{page !== numPages 
					? <Image src={ArrowRight} alt="전 페이지" />
					: null
				}
				</button>
			{/* </div> */}
		</div>
  )
}

export { Pagination };