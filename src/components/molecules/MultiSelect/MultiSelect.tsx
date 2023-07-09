import { getCareerYearNameFromValue } from '@/pages/api/getCareerYearName';
import { getInterviewNameFromValue } from '@/pages/api/getInterviewPeriodName';
import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import React, { useEffect, useState } from 'react';
import styles from './MultiSelect.module.scss';
import { Select } from '@/components/atoms';
import { CareerYear, InterviewPeriod } from '@/pages/api/Post/PostSelectObject';

interface MultiSelectProps {
  inputSelectBox: any;
  isChangeSelectBoxItems: any;
}

const MultiSelect = ({ inputSelectBox, isChangeSelectBoxItems }: MultiSelectProps) => {
  const [jobCategoriesArray, setJobCategoriesArray] = useState([]);
	const defaultSelectActiveValue = {
		interviewPeriod: false,
		careerYear: false,
		firstLevelId: false,
		secondLevelId: false,
	};
	const [selectActive, setSelectActive] = useState(defaultSelectActiveValue);
	const isChangeSelectActive = (name) => {
		setSelectActive((prev) => {
			return { ...defaultSelectActiveValue, [name]: !prev[name] };
		});
	};

	useEffect(() => {
		getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
	}, []);

  return (
		<div className={styles.select__area}>
			<Select
				selectSection="interviewPeriod"
				selectTitle={
					inputSelectBox.interviewPeriod === ""
						? "면접 시기"
						: getInterviewNameFromValue(inputSelectBox.interviewPeriod)
				}
				selectArray={InterviewPeriod}
				selectActive={selectActive}
				isChangeSelectActive={isChangeSelectActive}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
			<Select
				selectSection="careerYear"
				selectTitle={
					inputSelectBox.careerYear === ""
						? "경력"
						: getCareerYearNameFromValue(inputSelectBox.careerYear)
				}
				selectArray={CareerYear}
				selectActive={selectActive}
				isChangeSelectActive={isChangeSelectActive}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
			<Select
				selectSection="firstLevelId"
				selectTitle={
					inputSelectBox.firstLevelId === ""
						? "직종"
						: getFirstJobCategories(jobCategoriesArray).find(
								(current) => current.id === Number(inputSelectBox.firstLevelId)
						  ).name
				}
				selectArray={getFirstJobCategories(jobCategoriesArray)}
				selectActive={selectActive}
				isChangeSelectActive={isChangeSelectActive}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
			<Select
				selectSection="secondLevelId"
				selectTitle={
					inputSelectBox.secondLevelId === ""
						? "세부직무"
						: getSecondJobCategories(
								jobCategoriesArray,
								Number(inputSelectBox.firstLevelId)
						  ).find(
								(current) => current.id === Number(inputSelectBox.secondLevelId)
						  ).name
				}
				selectArray={
					inputSelectBox.firstLevelId === ""
						? []
						: getSecondJobCategories(
								jobCategoriesArray,
								Number(inputSelectBox.firstLevelId)
						  )
				}
				selectActive={selectActive}
				isChangeSelectActive={isChangeSelectActive}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
		</div>
  )
}

export { MultiSelect };