import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SearchArea } from '@/components/organisms/SearchArea';
import { setCaculateMonth, setCaculateYear } from '../api/dateConvert';
import { SearchCategory } from '@/components/atoms/SearchCategory';
import { getCareerYearNameFromValue } from '../api/getCareerYearName';
import { CareerYear, InterviewPeriod } from '../api/Post/PostSelectObject';
import { getInterviewNameFromValue } from '../api/getInterviewPeriodName';
import { SearchDateInput } from '@/components/atoms/SearchDateInput/SearchDateInput';
import { bringSearchInterviewListData } from '../api/Search/searchFetchDataAPI';
import { BoxTitle, Input, SeoHead, Title, SearchSelectBox, Button } from '@/components/atoms';
import { SearchItem } from '@/components/molecules';
import { getSecondLevelObject } from '../api/Search/getSecondLevel';

const defaultParamValue = {
	title								: "",
	category						: "",
	interviewPeriod			: "",
	startDate						: "",
	endDate							: "",
	careerYear					: "",
	page								: 1,
}

interface SecondLevelObjectProps {
	[key: string]: string;
}

interface DateObjectProps {
	startDate: string | Date;
	endDate: string | Date;
}

const secondLevelObject: SecondLevelObjectProps = {};

const limit = 15;

const SearchPage = () => {
	const router 				= useRouter();
	const today 				= new Date();
	const defaultValue 	= { startDate: today, endDate: today };
	const [	searchRadio		, setSearchRadio 	 ] = useState("ALL");
	const [	searchParam		, setSearchParam 	 ] = useState({...defaultParamValue});
	const [	totalPages		, setTotalPages		 ] = useState(0);
	const [	totalPosts		, setTotalPosts		 ] = useState(0);
	const [	interviewList	, setInterviewList ] = useState([]);
	const [	searchDetail	, setSearchDetail	 ] = useState<string | null>(null);
	const [	mobileFilter	, setMobileFilter	 ] = useState(false);

	useEffect(() => {
		getSecondLevelObject()
			.then((resolve) => resolve.map((current: SecondLevelObjectProps) => 
				secondLevelObject[current.jobCategoryId] = current.name
			));
	},[])

	const getSerachParamInterviewList = () => {
		bringSearchInterviewListData(searchParam)
			.then((result) => {
				setInterviewList(result.interviews);
				setTotalPages(result.totalPages);
				setTotalPosts(result.totalElements);
				console.log(interviewList);
			})
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
		if (!(searchParam.category?.split(',').length < 2 && Number(searchParam.category) <= 6)) {
			setSearchDetail(searchParam.category.split(',').map((current) => secondLevelObject[current]).join(','));
		} else {
			setSearchDetail(null);
		}
	},[searchParam.category])
  
  const resetSearchParams = useCallback((value: string) => {
		switch (value) {
			case "CATEGORIES":
				resetCategories();
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
		const checkedCategoriesArray = Array.from(document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>)
																				.filter(current => current.checked === true);
		checkedCategoriesArray.forEach(current => current.checked = false);
	}, [])

	const isChangeCategory = useCallback((name: string | null, value: string, parent: string | null) => {
		const checkedCategoriesArray = Array.from(document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>)
																				.filter(current => current.checked === true);
		if (checkedCategoriesArray.map((current) => current.name).find(current => current !== parent)) {
			if (parent) {
				checkedCategoriesArray.filter(current => current.name !== parent).forEach(current => current.checked = false);
				setSearchParam((prev) => {
					return { ...prev, category: value.toString() };
				});
			}
		} else {
			const foundElement = Array.from(document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>)
																.find(current => current.dataset.name === parent);
			if (name === parent) {
				checkedCategoriesArray.filter(current => current.dataset.name !== parent).forEach(current => current.checked = false);
			}
			else if (
				foundElement?.checked && checkedCategoriesArray.filter(current => current.dataset.name !== parent && current.name === parent).length
			) {
				foundElement.checked = false;
			}
			setSearchParam((prev) => {
				return {
					...prev,
					category: Array.from(document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>)
													.filter(current => current.checked === true)
													.map(current => current.value)
													.join(",")
				};
			});
		}
	}, [searchParam]);

	const isChangeCreatedDateRadio = useCallback((value: string) => {
		setSearchRadio((prev) => value);
		isValidationCheckForDateInput(value);
	}, []);
	
	const isValidationCheckForDateInput = useCallback((value: string) => {
		let dateObject: DateObjectProps = {
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

		setSearchParam((prev: any) => {
			return { ...prev, startDate: dateObject.startDate, endDate: dateObject.endDate };
		})

	}, []);

	const isChangeCurrentPage = useCallback((value: number) => {
		setSearchParam((prev) => {
			return { ...prev, page: value };
		});
	}, []);

	const isChangeStrDate = useCallback((value: Date | null) => {
		setSearchParam((prev: any) => {
			return { ...prev, startDate: value };
		});
	}, []);

	const isChangeEndDate = useCallback((value: Date | null) => {
		setSearchParam((prev: any) => {
			return { ...prev, endDate: value };
		});
	}, []);

	const isChangeSelectBoxItems = (name: string, value: string) => {
		setSearchParam((prev) => {
			return { ...prev, [name]: value };
		});
	};

	useEffect(() => {
		router.query?.title && isChangeSearchParam('title', `${router.query.title}`);
	}, [])
  
  return (
		<section className="search__area">
			<SeoHead title='인터뷰뱅크 검색' />
			<Title title='검색 결과' />
			<Button image={'FILTER'} value='상세필터' onClickEvent={() => setMobileFilter((prev) => !prev)}/>
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
          <SearchItem>            
						<SearchCategory
							isChangeCategory													= {isChangeCategory}
							resetSearchParams													= {resetSearchParams}
							searchDetail															= {searchDetail}
						/>          
          </SearchItem>
					<SearchItem>
						<BoxTitle
							title																			= {"경력"}
							field																			= "CAREERYEAR"
							resetSearchParams													= {resetSearchParams}
						/>
						<SearchSelectBox
							selectSection															= "careerYear"
							selectTitle																= {
																														searchParam.careerYear
																														? getCareerYearNameFromValue(searchParam.careerYear)
																														: "경력"
																													}
							selectArray																= {CareerYear}
							isChangeSelectBoxItems										= {isChangeSelectBoxItems}
						/>							
					</SearchItem>
					<SearchItem>							
						<BoxTitle
							title																			= {"면접시기"}
							field																			= "INTERVIEWPERIOD"
							resetSearchParams													= {resetSearchParams}
						/>
						<SearchSelectBox
							selectSection															= "interviewPeriod"
							selectTitle																= {
																														searchParam.interviewPeriod
																														? getInterviewNameFromValue(searchParam.interviewPeriod)
																														: "면접 시기"
																													}
							selectArray																= {InterviewPeriod}
							isChangeSelectBoxItems										= {isChangeSelectBoxItems}
						/>	
					</SearchItem>
					<SearchItem>
						<SearchDateInput
							searchRadio																= {searchRadio}
							startDate																	= {searchParam.startDate}
							endDate																		= {searchParam.endDate}
							isChangeCreatedDateRadio									= {isChangeCreatedDateRadio}
							isChangeStrDate														= {isChangeStrDate}
							isChangeEndDate														= {isChangeEndDate}
							resetSearchParams													= {resetSearchParams}
						/>
					</SearchItem>
				</div>
				{mobileFilter
					&& 	<div className="search__mobile__filter">
								<div className="search__mobile__background"></div>
								<div className="search__mobile__whiteground">
									<div className="search__mobile__title">
										<h3>상세필터</h3>
										<Button image={"CLOSE"} value='' imgWidth={24} imgHeight={24} onClickEvent={() => setMobileFilter(false)}/>
									</div>
									<SearchItem>            
										<SearchCategory
											isChangeCategory									= {isChangeCategory}
											resetSearchParams									= {resetSearchParams}
											searchDetail											= {searchDetail}
										/>          
									</SearchItem>
									<SearchItem>
										<BoxTitle
											title															= {"경력"}
											field															= "CAREERYEAR"
											resetSearchParams									= {resetSearchParams}
										/>
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
										<BoxTitle
											title															= {"면접시기"}
											field															= "INTERVIEWPERIOD"
											resetSearchParams									= {resetSearchParams}
										/>
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
											searchRadio												= {searchRadio}
											startDate													= {searchParam.startDate}
											endDate														= {searchParam.endDate}
											isChangeCreatedDateRadio					= {isChangeCreatedDateRadio}
											isChangeStrDate										= {isChangeStrDate}
											isChangeEndDate										= {isChangeEndDate}
											resetSearchParams									= {resetSearchParams}
										/>
									</SearchItem>
								</div>
								
							</div>

				}
        <div className="search__right">
					<SearchArea
						totalPages													= {totalPages}
						totalPosts													= {totalPosts}
						limit																= {limit}
						setPage															= {isChangeCurrentPage}
						searchParam													= {searchParam}
						interviewList												= {interviewList}
					/>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;