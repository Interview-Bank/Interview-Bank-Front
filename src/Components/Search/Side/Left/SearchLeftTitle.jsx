import React from "react";

const SearchLeftTitle = ({ title, field, resetSearchParams }) => {
	return (
		<div className="search__title">
			<h5>{title}</h5>
			<span onClick={() => resetSearchParams(field)}>초기화 하기</span>
			<style jsx>{`
				.search__title {
					display: flex;
					justify-content: space-between;
					width: 100%;
					font-size: 1rem;
				}
				.search__title > h5 {
					font-size: 1rem;
				}
				.search__title > span {
					color: #737373;
					margin: 1.67em 0;
					font-size: 1rem;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default SearchLeftTitle;
