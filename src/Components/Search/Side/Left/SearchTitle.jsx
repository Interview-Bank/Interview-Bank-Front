import React from "react";
import Search from "../../../../Assets/Images/search.png";

const SearchTitle = ({ isChangeTitle }) => {
	return (
		<>
			<input
				type="text"
				// onChange={(e) => isChangeTitle(e)}
				onKeyDown={(e) => isChangeTitle(e)}
			/>
			<img src={Search} alt="search" />
			<style jsx>{`
				.search__item > input {
					width: calc(100% - 20px);
					border: 1px solid #2e55e7;
					border-radius: 8px;
					font-size: 1.2rem;
					padding: 0 10px;
					height: 45px;
				}

				.search__item > img {
					width: 24px;
					position: absolute;
					top: 12px;
					right: 6px;
				}
			`}</style>
		</>
	);
};

export default SearchTitle;
