import Layout from "../../Layout/Layout";
import { useState, useCallback, useEffect } from "react";
import SearchCategory from "../../Components/Search/Side/Left/SearchCategory";
import { bringSearchInterviewListData } from "../api/Search/searchFetchDataAPI";
import SearchArea from "../../Components/Search/Side/Right/SearchArea";
import SearchItem from "../../Components/Search/Side/Left/SearchItem";
import SearchTitle from "../../Components/Search/Side/Left/SearchTitle";
import SearchItemArea from "../../Components/Search/Side/Left/SearchItemArea";
import SearchDateInput from "../../Components/Search/Side/Left/SearchDateInput";
import SearchLeftTitle from "../../Components/Search/Side/Left/SearchLeftTitle";
import SearchSelectBox from "../../Components/Search/Side/Left/SearchSelectBox";
import { InterviewPeriod } from "../api/Post/PostSelectObject";

const SearchInterviewView = () => {
	const defaultValue = { startDate: new Date(), endDate: new Date() };
	const [searchParam, setSearchParam] = useState({
		title: "",
		category: "",
		interviewPeriod: "",
		...defaultValue,
	});
	const [interviewList, setInterviewList] = useState([]);

	useEffect(() => {
		bringSearchInterviewListData(searchParam)
			.then((result) => setInterviewList(result))
			.catch((resolve) => console.log(resolve));
	}, [searchParam]);

	// console.log(document.getElementsByName("개발")[0].checked);

	const isChangeTitle = useCallback((value) => {
		if (value.key === "Enter") {
			setSearchParam((prev) => {
				return { ...prev, title: value.target.value };
			});
		}
	}, []);

	const isChangeCategory = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, category: value };
		});
	}, []);

	const isChangeStrDate = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, startDate: value };
		});
	}, []);

	const isChangeEndDate = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, endDate: value };
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
							<SearchTitle isChangeTitle={isChangeTitle} />
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchCategory isChangeCategory={isChangeCategory} />
							</SearchItemArea>
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchLeftTitle title={"면접시기"} />
								<SearchSelectBox
									selectSection="interviewPeriod"
									selectTitle={
										searchParam.interviewPeriod === ""
											? "면접 시기"
											: InterviewPeriod.find(
													(current) =>
														current.value === searchParam.interviewPeriod
											  ).name
									}
									selectArray={InterviewPeriod}
									// isChangeSelectBoxItems={isChangeSelectBoxItems}
								/>
							</SearchItemArea>
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchDateInput
									startDate={searchParam.startDate}
									endDate={searchParam.endDate}
									isChangeStrDate={isChangeStrDate}
									isChangeEndDate={isChangeEndDate}
								/>
							</SearchItemArea>
						</SearchItem>
					</div>
					<div className="search__right">
						<SearchArea
							searchParam={searchParam}
							interviewList={interviewList}
						/>
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
					width: calc(32% - 21px);
					margin-right: 21px;
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
