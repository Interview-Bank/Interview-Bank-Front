import React, { useEffect, useState } from "react";
import {
	getFirstJobCategories,
	getJobCategories,
	getSecondJobCategories,
} from "../../../Pages/api/Post/jobCategoryAPI";
import {
	CareerYear,
	InterviewPeriod,
} from "../../../Pages/api/Post/PostSelectObject";
import PostSelectBox from "./PostSelectBox";

const PostSelect = ({ inputSelectBox, isChangeSelectBoxItems }) => {
	const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

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
						: InterviewPeriod.find(
								(current) => current.value === inputSelectBox.interviewPeriod
						  ).name
				}
				selectArray={InterviewPeriod}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
			<PostSelectBox
				selectSection="careerYear"
				selectTitle={
					inputSelectBox.careerYear === ""
						? "경력"
						: CareerYear.find(
								(current) => current.value === inputSelectBox.careerYear
						  ).name
				}
				selectArray={CareerYear}
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
				isChangeSelectBoxItems={isChangeSelectBoxItems}
			/>
			<style jsx>{`
				.select__area {
					max-width: 1100px;
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
				}
			`}</style>
		</div>
	);
};

export default PostSelect;
