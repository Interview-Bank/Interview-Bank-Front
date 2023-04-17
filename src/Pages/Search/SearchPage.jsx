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
import { getInterviewNameFromValue } from '../api/getInterviewPeriodName';
import { setCaculateYear, setCaculateMonth } from '../api/dateConvert';

const SearchInterviewView = () => {
	const today = new Date();
	const defaultValue = { startDate: today, endDate: today };
	const [searchRadio, setSearchRadio] = useState("ALL");
	const [searchParam, setSearchParam] = useState({
		title: "",
		category: "",
		interviewPeriod: "",
		startDate: "",
		endDate: ""
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

	const isChangeCreatedDateRadio = useCallback((value) => {
		setSearchRadio((prev) => value);
		isValidationCheckForDateInput(value);
	}, []);
	
	const isValidationCheckForDateInput = useCallback((value) => {
		let dateObject = {
			startDate: "",
			endDate: "",
		}
		console.log(value)
		switch (value) {
			case "ALL":
				dateObject.startDate = "";
				dateObject.endDate = "";
				break;
			case "RECENT_1MONTH":
				dateObject.startDate = setCaculateMonth(-1);
				dateObject.endDate = today;
				break;
			case "RECENT_3MONTH":
				dateObject.startDate = setCaculateMonth(-3);
				dateObject.endDate = today;
				break;
			case "RECENT_6MONTH":
				dateObject.startDate = setCaculateMonth(-6);
				dateObject.endDate = today;
				break;
			case "RECENT_1YEAR":
				dateObject.startDate = setCaculateYear(-1);
				dateObject.endDate = today;
				break;
			case "DIRECT_SELECT":
				dateObject = {...defaultValue};
				break;
			default:
				break;
		}
		console.log(dateObject);

		setSearchParam((prev) => {
			return { ...prev, startDate: dateObject.startDate, endDate: dateObject.endDate };
		})

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

	const isChangeInterviewPeriod = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, interviewPeriod: value };
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
									selectTitle={
										searchParam.interviewPeriod === ""
											? "면접 시기"
											: getInterviewNameFromValue(searchParam.interviewPeriod)
									}
									selectArray={InterviewPeriod}
									isChangeSelectBoxItems={isChangeInterviewPeriod}
								/>
							</SearchItemArea>
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchDateInput
									searchRadio={searchRadio}
									startDate={searchParam.startDate}
									endDate={searchParam.endDate}
									isChangeCreatedDateRadio={isChangeCreatedDateRadio}
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
