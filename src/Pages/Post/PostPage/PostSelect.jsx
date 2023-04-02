import React from "react";

const primaryJobCategory = [
	{
		id: 1,
		name: "개발",
		parent_id: null,
	},
	{
		id: 2,
		name: "R&D",
		parent_id: null,
	},
	{
		id: 3,
		name: "디자인",
		parent_id: null,
	},
	{
		id: 4,
		name: "기획/PM",
		parent_id: null,
	},
	{
		id: 5,
		name: "마케팅",
		parent_id: null,
	},
	{
		id: 6,
		name: "기타",
		parent_id: null,
	},
];

const secondaryJobCategory = [
	{
		id: 7,
		name: "백엔드",
		parent_id: 1,
	},
];

const secondaryJobCategoryTestList = secondaryJobCategory.filter(
	(current) => current.parent_id === 1
);

const PostSelect = ({ category, isChangeCategory }) => {
	return (
		<div className="select__area">
			<select name="interviewPeriod" id="interviewPeriod">
				<option value="">면접 시기</option>
			</select>
			<select name="careerAge" id="careerAge">
				<option value="">경력</option>
			</select>
			<select
				name="primaryJobCategory"
				id="primaryJobCategory"
				defaultValue={category.primaryJobCategory}
				// value={category}
				onChange={(e) => isChangeCategory("primaryJobCategory", e.target.value)}
			>
				<option value="">직종</option>
				{primaryJobCategory &&
					primaryJobCategory.map((current) => (
						<option value={current.name} key={current.id} id={current.id}>
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
						<option value={current.name} key={current.id}>
							{current.name}
						</option>
					))}
			</select>
			<style jsx>{`
				.select__area {
					max-width: 1100px;
					width: calc(100% - 40px);
					margin: 58px auto 0;
					height: 66px;
					color: #5c5c5c;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
					border-radius: 8px;
				}
				select {
					width: 25%;
					height: 100%;
					padding-left: 30px;
					color: #5c5c5c;
					border-top: 0;
					border-bottom: 0;
					border-left: 0;
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
		</div>
	);
};

export default PostSelect;
