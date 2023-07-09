import { SearchArea } from '@/components/atoms/SearchArea';
import { SearchTitle } from '@/components/atoms/SearchTitle';
import { useCallback, useEffect, useState } from 'react';
import { setCaculateMonth, setCaculateYear } from '../api/dateConvert';
import { SearchCategory } from '@/components/atoms/SearchCategory';
import { getCareerYearNameFromValue } from '../api/getCareerYearName';
import { CareerYear, InterviewPeriod } from '../api/Post/PostSelectObject';
import { getInterviewNameFromValue } from '../api/getInterviewPeriodName';
import { SearchDateInput } from '@/components/atoms/SearchDateInput/SearchDateInput';
import { bringSearchInterviewListData } from '../api/Search/searchFetchDataAPI';
import { Select } from '@/components/atoms/Select';
import { BoxTitle, SearchItem, SeoHead, Title } from '@/components/atoms';
import { SearchSelectBox } from '@/components/atoms/SearchSelectBox';

const SearchPage = () => {
  const today = new Date();
	const defaultValue = { startDate: today, endDate: today };
	const defaultParamValue = {
		title: "",
		category: "",
		interviewPeriod: "",
		startDate: "",
		endDate: "",
		careerYear: "",
		page: 1,
	}

	const secondLevelObject = {
		7: '백엔드',
		8: '프런트엔드',
		9: '안드로이드',
		10: 'IOS',
		11: '모바일',
		12: 'DevOps',
		13: 'QA',
		14: '게임',
		15: 'AI',
		33: 'DBA',
		34: '기타',
	}

	const limit = 15;
	const [searchRadio, setSearchRadio] = useState("ALL");
	const [searchParam, setSearchParam] = useState({...defaultParamValue});
	const [totalPages, setTotalPages] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);
	const [interviewList, setInterviewList] = useState([]);
	const [searchDetail, setSearchDetail] = useState(null);
	
	useEffect(() => {
		bringSearchInterviewListData(searchParam)
			.then((result) => { setInterviewList(result.interviews); setTotalPages(result.totalPages);  setTotalPosts(result.totalElements)})
			.catch((resolve) => console.log(resolve));
	}, [searchParam]);
	
	useEffect(() => {
		console.log(searchParam.category)
		if (!(searchParam.category?.split(',').length < 2 && Number(searchParam.category) <= 6)) {
			setSearchDetail(searchParam.category.split(',').map((current) => secondLevelObject[current]).join(','));
		} else {
			setSearchDetail(null);
		}
	},[searchParam.category])
  
  const resetSearchParams = useCallback((value: any) => {
		switch (value) {
			case "CATEGORIES":
				resetCategories();
				// isChangeCategory("");
				break;
			case "INTERVIEWPERIOD":
				isChangeInterviewPeriod("");
				break;
			case "CREATEDAT":
				isChangeCreatedDateRadio("ALL");
				break;
			case "CAREERYEAR":
				isChangeCareerYear("");
				break;
			default:
				break;
		}
		
		isChangeCurrentPage(1);
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

	const isChangeCategory = useCallback((name, value, parent) => {
		const checkedCategoriesArray = Array.from(document.querySelectorAll("input[type=checkbox]"))
																				.filter(current => current.checked === true);
		if (checkedCategoriesArray.map((current) => current.name).find(current => current !== parent)) {
			if (parent) {
				checkedCategoriesArray.filter(current => current.name !== parent).forEach(current => current.checked = false);
				setSearchParam((prev) => {
					return { ...prev, category: value.toString() };
				});
			}
		} else {
			if (name === parent) {
				checkedCategoriesArray.filter(current => current.dataset.name !== parent).forEach(current => current.checked = false);
			}
			else if (
				Array.from(document.querySelectorAll("input[type=checkbox]")).find(current => current.dataset.name === parent) &&
				Array.from(document.querySelectorAll("input[type=checkbox]")).find(current => current.dataset.name === parent).checked
				&& checkedCategoriesArray.filter(current => current.dataset.name !== parent && current.name === parent).length
			) {
				Array.from(document.querySelectorAll("input[type=checkbox]")).find(current => current.dataset.name === parent).checked = false;
			}
			setSearchParam((prev) => {
				return {
					...prev,
					category: Array.from(document.querySelectorAll("input[type=checkbox]"))
													.filter(current => current.checked === true)
													.map(current => current.value)
													.join(",")
				};
			});
		}
	}, [searchParam]);

	const isChangeCreatedDateRadio = useCallback((value) => {
		setSearchRadio((prev) => value);
		isValidationCheckForDateInput(value);
	}, []);
	
	const isValidationCheckForDateInput = useCallback((value) => {
		let dateObject = {
			startDate: "",
			endDate: "",
		}
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

	const isChangeCurrentPage = useCallback((value) => {
		setSearchParam((prev) => {
			return { ...prev, page: value };
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
		<section className="search__area">
			<SeoHead title='인터뷰뱅크 검색' />
      <Title title='검색 결과' />
      <div className="search__flex">
        <div className="search__left">
          <SearchItem type={"title"}>
            <SearchTitle isChangeTitle={isChangeTitle}/>
          </SearchItem>
          <SearchItem>            
						<SearchCategory isChangeCategory={isChangeCategory} resetSearchParams={resetSearchParams} searchDetail={searchDetail} />            
          </SearchItem>
					<SearchItem>
						<BoxTitle title={"경력"} field="CAREERYEAR" resetSearchParams={resetSearchParams} />
						<SearchSelectBox
							selectTitle={
								searchParam.careerYear === ""
									? "경력"
									: getCareerYearNameFromValue(searchParam.careerYear)
							}
							selectArray={CareerYear}
							isChangeSelectBoxItems={isChangeCareerYear}
						/>							
					</SearchItem>
					<SearchItem>							
						<BoxTitle title={"면접시기"} field="INTERVIEWPERIOD" resetSearchParams={resetSearchParams} />
						<SearchSelectBox
							selectTitle={
								searchParam.interviewPeriod === ""
									? "면접 시기"
									: getInterviewNameFromValue(searchParam.interviewPeriod)
							}
							selectArray={InterviewPeriod}
							isChangeSelectBoxItems={isChangeInterviewPeriod}
						/>
					</SearchItem>
					<SearchItem>
						<SearchDateInput
							searchRadio={searchRadio}
							startDate={searchParam.startDate}
							endDate={searchParam.endDate}
							isChangeCreatedDateRadio={isChangeCreatedDateRadio}
							isChangeStrDate={isChangeStrDate}
							isChangeEndDate={isChangeEndDate}
							resetSearchParams={resetSearchParams}
						/>
					</SearchItem>
        </div>
        <div className="search__right">
					<SearchArea
						totalPages={totalPages}
						totalPosts={totalPosts}
						limit={limit}
						setPage={isChangeCurrentPage}
						searchParam={searchParam}
						interviewList={interviewList}
					/>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;