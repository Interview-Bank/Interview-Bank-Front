import React, { useState } from 'react'
import ArrowLeft from '../../Assets/Images/Icons/arrow_left.png'
import ArrowRight from '../../Assets/Images/Icons/arrow_right.png'

const Pagination = ({ page, totalPosts, limit, setPage, totalPages }) => {
  const numPages = Math.ceil(totalPosts/limit)
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 5) + 1;
	let lastNum = currPage - (currPage % 5) + 5;

  return (
		<div className='page__area'>
			{/* <div> */}
			<button 
				className='page__move'
				onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
			>
				{page !== 1 
					? <img src={ArrowLeft} alt="전 페이지" />
					: null
				}
			</button>
			<button
				className={page === firstNum ? 'page__btn active' : 'page__btn'}
				onClick={() => setPage(firstNum)}
				aria-current={page === firstNum ? "page" : null}>
				{firstNum}
			</button>
			{Array(totalPages-1 < 5 ? totalPages-1 : 4).fill().map((_, i) =>{
				if(i <=2){
					return (
						<button
							className={page === firstNum+1+i ? 'page__btn active' : 'page__btn'}
							border="true" 
							key={i+1} 
							onClick={() => {setPage(firstNum+1+i)}}
							aria-current={page === firstNum+1+i ? "page" : null}>
							{firstNum+1+i}
						</button>
					)
				}
				else if(i>=3){
					return (
						<button 
							className='page__btn'
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
				className='page__move'
				onClick={() => {setPage(page+1); setCurrPage(page);}} 
			>
				{page !== numPages 
					? <img src={ArrowRight} alt="전 페이지" />
					: null
				}
				</button>
			{/* </div> */}
			<style jsx>{`
				.page__area {
					// width: 100%;
					margin: 40px auto 0;
					text-align: center;
					height: 2rem;
					display: flex;
					justify-content: center;
				}

				.page__move {
					padding: 0 13px;
				}

				.page__area > button {
					border: 0;
					background-color: transparent;
					cursor: pointer;
				}
				
				.page__btn {
					margin: 0 calc(19px / 2);
				}

				.page__btn.active {
					width: 32px;
					height: 32px;
					background-color: #2E55E7;
					border-radius: 4px;
					color: #FFF;
				}

			`}</style>
		</div>
  )
}

export default Pagination;