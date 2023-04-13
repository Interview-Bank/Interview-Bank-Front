import Layout from "../../Layout/Layout";
import { useState, useCallback, useEffect } from "react";
import SearchCategory from '../../Components/Search/Side/Left/SearchCategory';
import { bringSearchInterviewListData } from '../api/Search/searchFetchDataAPI';
import SearchArea from '../../Components/Search/Side/Right/SearchArea';
import SearchItem from '../../Components/Search/Side/Left/SearchItem';
import SearchTitle from '../../Components/Search/Side/Left/SearchTitle';
import SearchItemArea from '../../Components/Search/Side/Left/SearchItemArea';
import SearchDateInput from '../../Components/Search/Side/Left/SearchDateInput';

const SearchInterviewView = () => {
	const [searchParam, setSearchParam] = useState({
		title: "",
		category: "",
	});
	const [interviewList, setInterviewList] = useState([]);

	useEffect(() => {
		bringSearchInterviewListData()
			.then((result) => setInterviewList(result))
			.catch((resolve) => console.log(resolve));
	}, [searchParam]);
	console.log(searchParam)


	const isChangeCategory = useCallback((value) => {
		console.log(value);
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
			<section className="search__area">
				<h1>검색 결과</h1>
				<div className="search__flex">
					<div className="search__left">
						<SearchItem>
							<SearchTitle />
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchCategory isChangeCategory={isChangeCategory} />
							</SearchItemArea>
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchDateInput />
							</SearchItemArea>
						</SearchItem>
					</div>
					<div className="search__right">
						<SearchArea searchParam={searchParam} interviewList={interviewList} />
					</div>
				</div>
			</section>
			<style jsx>{`
				.search__area {
					min-height: calc(100vh - 60px - 151px);
					width: 96%;
					max-width: 1100px;
					display: flex;
					margin: 0 auto;
					flex-wrap: wrap;
					margin: 0px auto 150px;
				}
				.search__area > h1 {
					height: 40px;
					width: 100%;
					padding-top: 20px;
					font-size: 28px;
					font-weight: 700;
					background-color: #f9f9f9;
					font-weight: 700;
					margin-top: 60px;
					display: flex;
					margin-bottom: 24px;
				}

				.search__flex {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.search__left {
					display: flex;
					flex-wrap: wrap;
					width: calc(32% - 40px);
					margin-right: 40px;
					height: 100%;
				}

				.search__left > div {
					margin-bottom: 25px;
				}
			`}</style>
		</Layout>
	);
};

export default SearchInterviewView;