import React from "react";
import { useState } from 'react';
import {
	CareerAge,
	InterviewPeriod,
	PrimaryJobCategory,
	SecondaryJobCategory,
} from "./PostSelectObject";

const secondaryJobCategoryTestList = SecondaryJobCategory.filter(
	(current) => current.parent_id === 1
);

const SelectBox = ({ selectTitle, selectArray }) => {
	const [selectActive, setSelectActive] = useState(false);
	return (
		<ul className={selectActive ? 'ul__select active' : 'ul__select'} onClick={()=>{setSelectActive(prev=>!prev)}}>
			<p>{selectTitle}</p>
			<div className={selectActive ? 'select__option active' : 'select__option'}>
				<p>선택하세요</p>
				{selectArray &&
				selectArray.map((current) => (
					<p key={current.id}>
						{current.name}
					</p>
				))}
			</div>
			<button className='btn__arrow'>{">"}</button>
			<style jsx>{`
				.ul__select {
					width: calc(25% - 60px - 3px);
					max-height: 66px;
					padding: 0px 30px;
					color: #5c5c5c;
					border-top: 0;
					border-bottom: 0;
					border-left: 0;
					cursor: pointer;
					border-right: 1px solid #ddd;
					position: relative;
					overflow-y: hidden;
				}
				.select__option {
					position: absolute;
					top: 0;
					left: 0;
					width: calc(100% - 30px * 2);
					max-height: 0;
					opacity: 0;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
					border-radius: 8px;
					background-color: white;
					z-index: 7;
				}
				.select__option.active {
					max-height: 100em;
					padding: 0 30px;
					opacity: 1;
				}
				.select__option > p {
					width: 100%;
					height: 66px;
					line-height: 66px;
					margin: 0;
				}
				.ul__select.active {
					max-height: 100em;
					overflow-y: unset;
				}
				.ul__select:nth-child(4) {
					border-right: 0;
				}
				.ul__select > p{
					width: 100%;
					height: 100%;
					margin: 0;
					line-height: 66px;
				}
				.ul__select.active > p{
					opacity: 0;
				}
				.ul__select > li {
					width: 100%;
					height: 66px;
					line-height: 66px;
				}
				.btn__arrow {
					position: absolute;
					margin: 0;
					padding: 0;
					top: 25px;
					right: 22px;
					border: 0;
					background-color: transparent;
					
				}
				ul, li {
					list-style:none;
					margin: 0;
					padding: 0;
				}
				select {
					width: 25%;
					height: 100%;
					padding-left: 30px;
					color: #5c5c5c;
					border-top: 0;
					border-bottom: 0;
					border-left: 0;
					cursor: pointer;
					// -o-appearance: none;
					// -webkit-appearance: none;
					// -moz-appearance: none;
					// appearance: none;
				}
				select:first-child {
					border-right: 1px solid #ddd;
					border-radius: 8px 0 0 8px;
				}
				select:nth-child(4) {
					border-radius: 0 8px 8px 0;
				}
				select + select {
					border-right: 1px solid #ddd;
				}
			`}</style>
		</ul>
	)
}

const PostSelect = ({ category, isChangeCategory }) => {
	
	return (
		<div className="select__area">
			<SelectBox selectTitle={"면접 시기"} selectArray={InterviewPeriod} />
			<SelectBox selectTitle={"경력"} selectArray={CareerAge} />
			<SelectBox selectTitle={"직종"} selectArray={PrimaryJobCategory} />
			<SelectBox selectTitle={"세부직무"} selectArray={secondaryJobCategoryTestList} />
			{/* <select name="interviewPeriod" id="interviewPeriod">
				<option value="">면접 시기</option>
				{InterviewPeriod &&
					InterviewPeriod.map((current) => (
						<option value={current.id} key={current.id} id={current.id}>
							{current.name}
						</option>
					))}
			</select>
			<select name="careerAge" id="careerAge">
				<option value="">경력</option>
				{CareerAge &&
					CareerAge.map((current) => (
						<option value={current.id} key={current.id} id={current.id}>
							{current.name}
						</option>
					))}
			</select>
			<select
				name="primaryJobCategory"
				id="primaryJobCategory"
				defaultValue={category.primaryJobCategory}
				onChange={(e) => isChangeCategory("primaryJobCategory", e.target.value)}
			>
				<option value="">직종</option>
				{PrimaryJobCategory &&
					PrimaryJobCategory.map((current) => (
						<option value={current.id} key={current.id} id={current.id}>
							{current.name}
						</option>
					))}
			</select>
			<select
				name="secondaryJobCategory"
				id="secondaryJobCategory"
				defaultValue={category.secondaryJobCategory}
				onChange={(e) =>
					isChangeCategory("secondaryJobCategory", e.target.value)
				}
			>
				<option value="">세부직무</option>
				{secondaryJobCategoryTestList &&
					secondaryJobCategoryTestList.map((current) => (
						<option value={current.id} key={current.id}>
							{current.name}
						</option>
					))}
			</select> */}
			<style jsx>{`
				.select__area {
					max-width: 1100px;
					width: calc(100% - 40px);
					margin: 58px auto 0;
					height: 66px;
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
