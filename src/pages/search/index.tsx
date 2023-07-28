import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SearchArea } from '@/components/atoms/SearchArea';
import { SearchTitle } from '@/components/atoms/SearchTitle';
import { setCaculateMonth, setCaculateYear } from '../api/dateConvert';
import { SearchCategory } from '@/components/atoms/SearchCategory';
import { getCareerYearNameFromValue } from '../api/getCareerYearName';
import { CareerYear, InterviewPeriod } from '../api/Post/PostSelectObject';
import { getInterviewNameFromValue } from '../api/getInterviewPeriodName';
import { SearchDateInput } from '@/components/atoms/SearchDateInput/SearchDateInput';
import { bringSearchInterviewListData } from '../api/Search/searchFetchDataAPI';
import { BoxTitle, IconImage, Input, SeoHead, Title, SearchSelectBox } from '@/components/atoms';
import { defaultSelectActiveValue } from '@/components/molecules/MultiSelect';
import { SearchItem } from '@/components/molecules';

const defaultParamValue = {
	title								: "",
	category						: "",
	interviewPeriod			: "",
	startDate						: "",
	endDate							: "",
	careerYear					: "",
	page								: 1,
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

const SearchPage = () => {
	const router 				= useRouter();
	const today 				= new Date();
	const defaultValue 	= { startDate: today, endDate: today };
	const [searchRadio, setSearchRadio] = useState("ALL");
	const [searchParam, setSearchParam] = useState({...defaultParamValue});
	const [totalPages, setTotalPages] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);
	const [interviewList, setInterviewList] = useState([]);
	const [searchDetail, setSearchDetail] = useState(null);
	const [selectActive, setSelectActive] = useState({ ...defaultSelectActiveValue });

	const getSerachParamInterviewList = () => {
		bringSearchInterviewListData(searchParam)
			.then((result) => { setInterviewList(result.interviews); setTotalPages(result.totalPages);  setTotalPosts(result.totalElements)})
			.catch((resolve) => console.log(resolve));
	}
	
	useEffect(() => {
		getSerachParamInterviewList();
	}, [
		searchParam.category,
		searchParam.interviewPeriod,
		searchParam.startDate,
		searchParam.endDate,
		searchParam.careerYear,
		searchParam.page
	]);
	
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
				isChangeSelectBoxItems("interviewPeriod", '');
				break;
			case "CREATEDAT":
				isChangeCreatedDateRadio("ALL");
				break;
			case "CAREERYEAR":
				isChangeSelectBoxItems("careerYear", '');
				break;
			default:
				break;
		}
		
		isChangeCurrentPage(1);
	}, [])

	const isChangeSearchParam = (name: string, value: string) => {
		setSearchParam((prev) => {
			return { ...prev, [name]: value };
		});
	};

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

	const isChangeSelectBoxItems = (name: string, value: string) => {
		setSearchParam((prev) => {
			return { ...prev, [name]: value };
		});
	};

	useEffect(() => {
		router.query?.title && isChangeSearchParam('title', router.query.title);
	}, [])
  
  return (
		<section className="search__area">
			<SeoHead title='인터뷰뱅크 검색' />
      <Title title='검색 결과' />
      <div className="search__flex">
				<div className="search__left">
					<Input 
						name							= 'title'
						value							= {searchParam.title}
						type							= 'text'
						placeholder				= '내용을 검색하세요.'
						maxLength					= {128}
						onChangeEvent			= {isChangeSearchParam}
						onKeyDown					= {true}
						onKeyDownEvent		= {getSerachParamInterviewList}
					/>
					{/* <IconImage icon="SEARCH" width={24} height={24} /> */}
          <SearchItem>            
						<SearchCategory isChangeCategory={isChangeCategory} resetSearchParams={resetSearchParams} searchDetail={searchDetail} />            
          </SearchItem>
					<SearchItem>
						<BoxTitle title={"경력"} field="CAREERYEAR" resetSearchParams={resetSearchParams} />
						<SearchSelectBox
							selectSection											= "careerYear"
							selectTitle												= {
																										searchParam.careerYear
																										? getCareerYearNameFromValue(searchParam.careerYear)
																										: "경력"
																									}
							selectArray												= {CareerYear}
							isChangeSelectBoxItems						= {isChangeSelectBoxItems}
						/>							
					</SearchItem>
					<SearchItem>							
						<BoxTitle title={"면접시기"} field="INTERVIEWPERIOD" resetSearchParams={resetSearchParams} />
						<SearchSelectBox
							selectSection											= "interviewPeriod"
							selectTitle												= {
																										searchParam.interviewPeriod
																										? getInterviewNameFromValue(searchParam.interviewPeriod)
																										: "면접 시기"
																									}
							selectArray												= {InterviewPeriod}
							isChangeSelectBoxItems						= {isChangeSelectBoxItems}
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