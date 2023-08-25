import { getCareerYearNameFromValue } from '@/pages/api/getCareerYearName';
import { getInterviewNameFromValue } from '@/pages/api/getInterviewPeriodName';
import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import React, { useEffect, useState } from 'react';
import styles from './MultiSelect.module.scss';
import { Select } from '@/components/atoms';
import { CareerYear, InterviewPeriod } from '@/pages/api/Post/PostSelectObject';

interface MultiSelectProps {
  inputSelectBox					: any;
  isChangeSelectBoxItems	: (name: string, value: string) => void;
}

interface SelectActiveProps {
	[key: string]						: boolean;
	interviewPeriod					: boolean,
	careerYear							: boolean,
	firstLevelId						: boolean,
	secondLevelId						: boolean,
}

export const defaultSelectActiveValue: SelectActiveProps = {
	interviewPeriod					: false,
	careerYear							: false,
	firstLevelId						: false,
	secondLevelId						: false,
};

export interface JobCategoriesProps {
	firstLevelId: number;
	firstLevelName: string;
	secondJobCategories?: {
		secondLevelId?: number;
		secondLevelName?: string;
	}[]
}[];

const MultiSelect = ({ inputSelectBox, isChangeSelectBoxItems }: MultiSelectProps) => {
  const [	jobCategoriesArray, setJobCategoriesArray	] = useState<any[]>();
	const [	selectActive			, setSelectActive				]	= useState({...defaultSelectActiveValue});

	useEffect(() => {
		getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
	}, []);
	
	const isChangeSelectActive = (name: string) => {
		setSelectActive((prev) => {
			return { ...defaultSelectActiveValue, [name]: !prev[name] };
		});
	};

  return (
		<div className={styles.select__area}>
			<Select
				selectSection											= "interviewPeriod"
				selectTitle												= {
																							inputSelectBox.interviewPeriod
																								? getInterviewNameFromValue(inputSelectBox.interviewPeriod)
																								: "면접 시기"
																						}
				selectArray												= {InterviewPeriod}
				selectActive											= {selectActive.interviewPeriod}
				isChangeSelectActive							= {isChangeSelectActive}
				isChangeSelectBoxItems   					= {isChangeSelectBoxItems}
			/>
			<Select
				selectSection											= "careerYear"
				selectTitle												= {
																							inputSelectBox.careerYear
																								? getCareerYearNameFromValue(inputSelectBox.careerYear)
																								: "경력"
																						}
				selectArray												= {CareerYear}
				selectActive											= {selectActive.careerYear}
				isChangeSelectActive							= {isChangeSelectActive}
				isChangeSelectBoxItems						= {isChangeSelectBoxItems}
			/>
			<Select
				selectSection											= "firstLevelId"
				selectTitle												= {
																							jobCategoriesArray !== undefined && inputSelectBox.firstLevelId
																								? (getFirstJobCategories(jobCategoriesArray).find(
																										(current) => current.id === Number(inputSelectBox.firstLevelId)
																									) || {}).name || "직종"
																								: "직종"
																						}
				selectArray												= {jobCategoriesArray !== undefined ? getFirstJobCategories(jobCategoriesArray) : []}
				selectActive											= {selectActive.firstLevelId}
				isChangeSelectActive							= {isChangeSelectActive}
				isChangeSelectBoxItems						= {isChangeSelectBoxItems}
			/>
			<Select
				selectSection											= "secondLevelId"
				selectTitle												=	{
																							jobCategoriesArray !== undefined && inputSelectBox.secondLevelId
																								? getSecondJobCategories(
																									jobCategoriesArray,
																									Number(inputSelectBox.firstLevelId)
																									).find(
																										(current: any) => current.id === Number(inputSelectBox.secondLevelId)
																										).name
																								: "세부직무"
																						}
				selectArray												= {
																							jobCategoriesArray !== undefined && inputSelectBox.firstLevelId
																								? getSecondJobCategories(
																										jobCategoriesArray,
																										Number(inputSelectBox.firstLevelId)
																									)
																								: []
																						}
				selectActive											= {selectActive.secondLevelId}
				isChangeSelectActive							= {isChangeSelectActive}
				isChangeSelectBoxItems						= {isChangeSelectBoxItems}
			/>
		</div>
  )
}

export { MultiSelect };