import styled from "styled-components";
import Layout from "../../Layout/Layout";
import Search from "../../Assets/Images/search.png";
import { useState } from "react";
import { useCallback } from "react";

const categoryData = [
	{
		id: 1,
		category: "develope",
		name: "개발",
	},
	{
		id: 2,
		category: "plan",
		name: "기획",
	},
	{
		id: 3,
		category: "R&D",
		name: "R&D",
	},
	{
		id: 4,
		category: "design",
		name: "디자인",
	},
	{
		id: 5,
		category: "marketing",
		name: "마케팅",
	},
	{
		id: 6,
		category: "other",
		name: "기타",
	},
];

const searchArrayList = [
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 0,
		nickname: "aaaa",
		title: "네이버 면접 2022",
		category: "develope",
	},
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 1,
		nickname: "aaaa",
		title: "쿠팡 면접 2022",
		category: "plan",
	},
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 2,
		nickname: "aaaa",
		title: "야놀자 면접 2022",
		category: "design",
	},
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 3,
		nickname: "aaaa",
		title: "카카오 면접 2022",
		category: "R&D",
	},
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 4,
		nickname: "aaaa",
		title: "다음 면접 2022",
		category: "marketing",
	},
	{
		createdAt: "2023-03-29T04:46:54.021Z",
		interviewId: 5,
		nickname: "aaaa",
		title: "면접 2022",
		category: "other",
	},
];

const SearchCategory = ({ isChangeCategory }) => {
	return (
		<>
			<h2>직무 구분</h2>
			{categoryData &&
				categoryData.map((current) => (
					<SearchCategoryCheckBox
						data={current}
						key={current.id}
						isChangeCategory={isChangeCategory}
					/>
				))}
		</>
	);
};

const SearchCategoryCheckBox = ({ data, isChangeCategory }) => {
	const [toggle, setToggle] = useState(false);
	const { name, category } = data;
	const onClick = useCallback((value) => {
		isChangeCategory(value);
	}, []);
	return (
		<div className="check__area" onClick={() => onClick(category)}>
			<div className="check__select" onClick={() => setToggle((prev) => !prev)}>
				<input type="radio" name="category" value={category} />
				<label for={category} style={{ width: "calc(100% - 13px - 24px)" }}>
					{name}
				</label>
				<button className="btn__arrow">{">"}</button>
			</div>
			<ul className={toggle ? "acordian active" : "acordian"}>
				<li>1</li>
				<li>1</li>
				<li>1</li>
			</ul>
			<style jsx>{`
				.check__area {
					position: relative;
					display: flex;
					width: 100%;
					margin-bottom: 10px;
					align-items: center;
					flex-wrap: wrap;
					cursor: pointer;
				}
				.check__select {
					cursor: pointer;
					width: 100%;
					display: flex;
				}

				.acordian {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					align-items: center;
					max-height: 0;
					// opacity: 0;
					overflow-y: hidden;
					transition: all 0.2s ease-out;
				}
				.acordian.active {
					max-height: 100em;
				}
				label {
					padding-left: 13px;
				}
				.btn__arrow {
					position: absolute;
					border: 0;
					background-color: transparent;
					right: 0;
					// top: 6px;
				}
				li {
					width: calc(100% - 15%);
					padding-left: 15%;
				}
			`}</style>
		</div>
	);
};

const SearchArea = ({ searchParam }) => {
	const { category } = searchParam;
	return (
		<div className="search__area">
			{searchArrayList.length ? (
				<div className="search-list">
					{searchArrayList.length && category
						? searchArrayList
								.filter((current) => current.category === category)
								.map((current) => <SearchAreaItem item={current} />)
						: searchArrayList.map((current) => (
								<SearchAreaItem item={current} />
						  ))}
				</div>
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
				.search__area {
					width: 68%;
					min-height: calc(100vh - 60px - 151px);
				}
				.search-empty {
					text-align: center;
					width: 100%;
					height: 100%;
					border-radius: 16px;
					border: 1px solid #d9d9d9;
					background-color: white;
					color: #ababab;
					font-size: 24px;
					padding-top: 12rem;
				}
				.search-empty > span {
					width: 100%;
				}
				.search-list {
					display: grid;
					width: 100%;
					grid-template-columns: repeat(3, 1fr);
					gap: 30px;
				}
			`}</style>
		</div>
	);
};

const SearchAreaItem = ({ item }) => {
	const { interviewId, title } = item;
	return (
		<div className="search__item" key={interviewId}>
			<h4>{title}</h4>
			<style jsx>{`
				.search__item {
					width: calc(100% - (29px * 2));
					aspect-ratio: 1/1.2D;
					background-color: white;
					border-radius: 20px;
					border: 1px solid #d9d9d9;
					padding: 29px;
					font-size: 24px;
					font-weight: 600;
				}
				.search__item > h4 {
					margin-top: 200px;
				}
			`}</style>
		</div>
	);
};

const SearchInterviewView = () => {
	const [searchParam, setSearchParam] = useState({
		title: "",
		category: "",
	});

	const isChangeCategory = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, category: value };
		});
	}, []);

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			console.log("hh");
		}
	};
	return (
		<Layout>
			<SearchWrapper>
				<h1>검색 결과</h1>
				<SearchFlex>
					<SerachSide>
						<SearchItem>
							<input
								type="text"
								onChange={(e) =>
									setSearchParam((prev) => {
										return { ...prev, title: e.target.value };
									})
								}
								onKeyDown={(e) => onKeyDown(e)}
							/>
							<img src={Search} alt="search" />
						</SearchItem>
						<SearchItem>
							<SearchCarrerArea>
								<SearchCategory isChangeCategory={isChangeCategory} />
							</SearchCarrerArea>
						</SearchItem>
						<SearchItem>
							<SearchDateArea>
								<h2>기간</h2>
								<SearchDateInput>
									<input className="input-first" type="date" name="" id="" />
								</SearchDateInput>
								<SearchDateInput>
									<input type="date" name="" id="" />
								</SearchDateInput>
							</SearchDateArea>
						</SearchItem>
					</SerachSide>
					<SearchArea searchParam={searchParam} />
				</SearchFlex>
			</SearchWrapper>
		</Layout>
	);
};

const SearchWrapper = styled.div`
	min-height: calc(100vh - 60px - 151px);
	width: 96%;
	max-width: 1100px;
	display: flex;
	margin: 0 auto;
	flex-wrap: wrap;
	margin: 0px auto 150px;
	> h1 {
		height: 40px;
		width: 1096px;
		padding-top: 20px;
		font-size: 28px;
		font-weight: 700;
		background-color: #f9f9f9;
		font-weight: 700;
		margin-top: 60px;
		display: flex;
		margin-bottom: 24px;
	}
`;

const SearchFlex = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const SerachSide = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: calc(32% - 40px);
	margin-right: 40px;
	height: 100%;
	> div {
		margin-bottom: 25px;
	}
`;

const SearchItem = styled.div`
	position: relative;
	width: 100%;
	> input {
		width: calc(100% - 20px);
		border: 1px solid #2e55e7;
		border-radius: 8px;
		font-size: 1.2rem;
		padding: 0 10px;
		height: 45px;
	}
	> img {
		width: 36px;
		position: absolute;
		top: 6px;
		right: 0px;
	}
`;

const SearchCarrerArea = styled.div`
	width: calc(100% - 50px);
	background-color: white;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	padding: 0px 25px 16px;
`;

const SearchDateArea = styled.div`
	width: calc(100% - 50px);
	background-color: white;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	padding: 0px 25px 16px;
`;

const SearchDateInput = styled.div`
	display: flex;
	.input-first {
		margin-bottom: 15px;
	}
	> input {
		width: 100%;
		height: 45px;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 18px;
		padding: 0 8px;
	}
`;

export default SearchInterviewView;
