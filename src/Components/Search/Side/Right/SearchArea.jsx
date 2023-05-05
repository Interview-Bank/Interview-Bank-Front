import { useState } from 'react';
import PostComponent from "../../../../Layout/PostList/PostComponent";
import Pagination from '../../../Pagination/Pagination';

const SearchArea = ({ totalPosts, totalPages, interviewList, limit, setPage, searchParam }) => {
	return (
		<div className="search__right">
			{interviewList.length ? (
				<>
					<div className="search-list">
						{interviewList.map((current) => (
							<PostComponent
								key={current.interviewId}
								id={current.interviewId}
								title={current.title}
								nickname={current.nickname}
								firstCategoryName={current.jobCategory.firstLevelName}
								secondCategoryName={current.jobCategory.secondLevelName}
								createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
							/>
						))}
					</div>
					<div className="search__page">
						{totalPages && 
							<Pagination limit={limit} setPage={setPage} page={searchParam.page} totalPosts={totalPosts} totalPages={totalPages} />
						}
					</div>
				</>
			) : (
				<div className="search-empty">
					<h4>
						요청하신 조건에 맞는 검색 결과가 없습니다.
						<br />
						다른 키워드로 검색하시거나, 필터 옵션을 변경해 주세요.
					</h4>
				</div>
			)}
			<style jsx>{`
				.search__right {
					width: 100%;
					min-height: calc(100vh - 60px - 151px);
				}
				.search-empty {
					text-align: center;
					width: 100%;
					height: 100%;
					min-height: 320px;
					border-radius: 16px;
					border: 1px solid #d9d9d9;
					background-color: white;
					color: #ababab;
					font-size: 24px;
					position: relative;
				}
				.search-empty > h4 {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 100%;
					transform: translate(-50%, -50%);
					margin: 0;
					font-size: 0.83em;
					font-weight: 500;
				}
				.search-list {
					display: grid;
					width: 100%;
					grid-template-columns: repeat(3, 1fr);
					gap: 20px;
				}
				.search__page {
					width: 100%;
				}
			`}</style>
		</div>
	);
};

export default SearchArea;
