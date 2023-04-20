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
import { CareerYear, InterviewPeriod } from "../api/Post/PostSelectObject";
import { getInterviewNameFromValue } from '../api/getInterviewPeriodName';
import { setCaculateYear, setCaculateMonth } from '../api/dateConvert';
import { getCareerYearNameFromValue } from '../api/getCareerYearName';

const SearchInterviewView = () => {
	const today = new Date();
	const defaultValue = { startDate: today, endDate: today };
	const defaultParamValue = {
		title: "",
		category: "",
		interviewPeriod: "",
		startDate: "",
		endDate: "",
		careerYear: "",
	}
	console.log(CareerYear);
	const [searchRadio, setSearchRadio] = useState("ALL");
	const [searchParam, setSearchParam] = useState({...defaultParamValue});
	const [interviewList, setInterviewList] = useState([]);

	useEffect(() => {
		bringSearchInterviewListData(searchParam)
			.then((result) => setInterviewList(result))
			.catch((resolve) => console.log(resolve));
	}, [searchParam]);

	const resetSearchParams = useCallback((value) => {
		switch (value) {
			case "CATEGORIES":
				resetCategories();
				isChangeCategory("");
				break;
			case "INTERVIEWPERIOD":
				// setDataObject.startDate = "";
				// setDataObject.endDate = "";
				break;
			case "CREATEDAT":
				// setDataObject.startDate = "";
				// setDataObject.endDate = "";
				break;
			case "CAREERYEAR":
				break;
			default:
				break;
		}
		// setSearchParam((prev) => {

		// })
	}, [])

	const isChangeTitle = useCallback((value) => {
		if (value.key === "Enter") {
			setSearchParam((prev) => {
				return { ...prev, title: value.target.value };
			});
		}
	}, []);

	const resetCategories = useCallback(() => {
		const checkedCategoriesArray = Array.from(document.querySelectorAll("input[type=checkbox]"))
																				.filter(current => current.checked === true);
		checkedCategoriesArray.forEach(current => current.checked = false);
	}, [])

	const isChangeCategory = useCallback((value, parent) => {
		const checkedCategoriesArray = Array.from(document.querySelectorAll("input[type=checkbox]"))
																				.filter(current => current.checked === true);
		
		if (checkedCategoriesArray.map((current) => current.name).find(current => current !== parent)) {
			if (parent) {
				checkedCategoriesArray.filter(current => current.name !== parent).forEach(current => current.checked = false);
				setSearchParam((prev) => {
					return { ...prev, category: value };
				});
			}
		} else {
			setSearchParam((prev) => {
				return { ...prev, category: checkedCategoriesArray.map(current => current.value).join(",") };
			});
		}
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

	const isChangeCareerYear = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, careerYear: value };
		});
	}, []);
	
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
								<SearchCategory isChangeCategory={isChangeCategory} resetSearchParams={resetSearchParams} />
							</SearchItemArea>
						</SearchItem>
						<SearchItem>
							<SearchItemArea>
								<SearchLeftTitle title={"면접시기"} field="INTERVIEWPERIOD" resetSearchParams={resetSearchParams} />
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
						<SearchItem>
							<SearchItemArea>
								<SearchLeftTitle title={"경력"} field="CAREERYEAR" resetSearchParams={resetSearchParams} />
								<SearchSelectBox
									selectTitle={
										searchParam.careerYear === ""
											? "경력"
											: getCareerYearNameFromValue(searchParam.careerYear)
									}
									selectArray={CareerYear}
									isChangeSelectBoxItems={isChangeCareerYear}
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
					max-width: 1276px;
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
					width: calc(35% - 21px);
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
