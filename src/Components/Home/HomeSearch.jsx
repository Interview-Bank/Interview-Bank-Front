import React from "react";
import { useNavigate } from 'react-router';
import Search from "../../Assets/Images/search.png";
// import { SearchTag } from "../../Pages/api/Home/HomeSearchObject";

const HomeSearch = () => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate("/search");
	}
	return (
		<div className="search__area" onClick={()=>onClick()}>
			<h1>면접 정보 인터뷰 뱅크에서 알려드려요</h1>
			<div className="search__input">
				<input
					type="text"
					name="search"
					id="search"
					placeholder="회사, 직무 등을 검색해주세요!"
					maxLength={48}
				/>
				<img src={Search} alt="검색 버튼" />
			</div>
			<div className="search__tag">
				{/* {SearchTag &&
					SearchTag.map((current) => (
						<span className="font-grey" key={current.id}>
							#{current.name}
						</span>
					))} */}
			</div>
			<style jsx>{`
				.search__area {
					margin-top: 60px;
				}
				h1 {
					text-align: center;
					font-size: 2rem;
					margin-bottom: 28px;
				}
				.search__input {
					margin: 0 auto;
					width: 100%;
					max-width: calc(672px + 40px);
					padding: 0 20px;
					height: 48px;
					position: relative;
					cursor: pointer;
				}
				.search__input > input {
					padding: 0 28px;
					width: 100%;
					height: 100%;
					border: 2px solid #2e55e7;
					border-radius: 26px;
					font-size: 14px;
					color: #000;
				}
				.search__input > input:focus {					
					outline: 0;
				}
				.search__input > img {
					width: 24px;
					position: absolute;
					top: 14px;
					right: -14px;
				}
				.search__tag {
					margin: 18px auto 80px;
					max-width: 618px;
					display: flex;
					height: 17px;
					justify-content: space-between;
				}
				.font-grey {
					font-size: 12px;
					color: #666;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default HomeSearch;
