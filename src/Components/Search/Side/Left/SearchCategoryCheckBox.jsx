import React, { useState, useCallback } from "react";
import SearchCategoryCheckBoxItem from "./SearchCategoryCheckBoxItem";
import ArrowUp from "../../../../Assets/Images/Icons/arrow_up.png";
import ArrowDown from "../../../../Assets/Images/Icons/arrow_down.png";

const FirstSearchCategoriesCheckBox = ({
	category,
	name,
	toggle,
	setToggle,
	secondJobCategories,
	isChangeSelectCategories,
}) => {
	return (
		<div className="check__select">
			<label
				for={category}
				style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em" }}
				onClick={() => isChangeSelectCategories(category)}
			>
				<input type="checkbox" name={name} value={category} id={category} />
				{name}
			</label>
			{secondJobCategories.length ? (
				<button
					className="btn__arrow"
					onClick={() => setToggle((prev) => !prev)}
				>
					{toggle ? (
						<img src={ArrowUp} alt="화살표" />
					) : (
						<img src={ArrowDown} alt="화살표" />
					)}
				</button>
			) : null}
			<style jsx>{`
				.check__select > label {
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

const SearchCategoryCheckBox = ({
	data,
	isChangeCategory,
	secondJobCategories,
}) => {
	const [toggle, setToggle] = useState(false);
	const selectCategoryArray = [];
	const { name, id } = data;

	const isChangeSelectCategories = (value) => {
		selectCategoryArray.push(value);
		isChangeCategory(...selectCategoryArray.sort((a, b) => a - b));
	};
	return (
		<div className="check__area">
			<FirstSearchCategoriesCheckBox
				category={id}
				name={name}
				toggle={toggle}
				setToggle={setToggle}
				secondJobCategories={secondJobCategories}
				isChangeSelectCategories={isChangeSelectCategories}
			/>
			<ul className={toggle ? "acordian active" : "acordian"}>
				{secondJobCategories &&
					secondJobCategories.map((current) => (
						<SearchCategoryCheckBoxItem
							category={current.id}
							categoryDivide={name}
							name={current.name}
							key={current.name}
							isChangeSelectCategories={isChangeSelectCategories}
						/>
					))}
			</ul>
			{/* </ul> */}
			<style jsx>{`
				.check__area {
					position: relative;
					display: flex;
					width: 100%;
					margin-bottom: 10px;
					align-items: center;
					flex-wrap: wrap;
					cursor: pointer;
				}

				.check__select {
					cursor: pointer;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}

				.acordian {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					align-items: center;
					max-height: 0;
					// opacity: 0;
					overflow-y: hidden;
					// transition: all 0.2s ease-out;
				}

				.acordian.active {
					max-height: 100em;
				}

				// label {
				// 	padding-left: 13px;
				// }

				.btn__arrow {
					position: absolute;
					border: 0;
					background-color: transparent;
					right: 0;
					cursor: pointer;
					// top: 6px;
				}
				.acordian.active > li {
					width: calc(100% - 15%);
					padding: 10px 0 5px 15%;
				}
				.acordian.active > li > label {
					cursor: pointer;
				}

				label > input {
					vertical-align: middle;
					margin-right: 8px;
				}
			`}</style>
		</div>
	);
};

export default SearchCategoryCheckBox;
