import { getCareerYearNameFromValue } from '@/pages/api/getCareerYearName';
import { getInterviewNameFromValue } from '@/pages/api/getInterviewPeriodName';
import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import { CareerYear, InterviewPeriod } from '@/pages/api/Post/PostSelectObject';
import React, { useEffect, useState } from "react";
import { PostSelectBox } from './PostSelectBox';
import { Select } from '../Select';

const PostSelect = ({ inputSelectBox, isChangeSelectBoxItems }) => {
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
		<div className="select__area">
			<PostSelectBox
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
			<PostSelectBox
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
			<PostSelectBox
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
			<PostSelectBox
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
			<style jsx>{`
				.select__area {
					max-width: 1276px;
					width: calc(100% - 40px);
					margin: 58px auto 0;
					height: 52px;
					color: #5c5c5c;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
					border-radius: 8px;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					// justify-content: space-between;
					background-color: white;
					font-size: 1rem;
				}
			`}</style>
		</div>
	);
};

export { PostSelect };
