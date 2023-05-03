import React, { useState } from "react";
import SearchCategoryCheckBoxItem from "./SearchCategoryCheckBoxItem";
import ArrowUp from "../../../../Assets/Images/Icons/arrow_up.png";
import ArrowDown from "../../../../Assets/Images/Icons/arrow_down.png";

const FirstSearchCategoriesCheckBox = ({
	category,
	name,
	toggle,
	setToggle,
	secondJobCategories,
	isChangeCategory,
}) => {
	return (
		<div className="check__select">
			<label
				htmlFor={category}
				style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em" }}
				onClick={(e) => isChangeCategory(e.target.getAttribute("data-name"), category, e.target.getAttribute("name"))}
			>
				<input type="checkbox" name={name} value={category} id={category} data-name={name} />
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
	const { name, id } = data;

	return (
		<div className="check__area">
			<FirstSearchCategoriesCheckBox
				category={id}
				name={name}
				toggle={toggle}
				setToggle={setToggle}
				secondJobCategories={secondJobCategories}
				isChangeCategory={isChangeCategory}
			/>
			<ul className={toggle ? "acordian active" : "acordian"}>
				{secondJobCategories &&
					secondJobCategories.map((current) => (
						<SearchCategoryCheckBoxItem
							category={current.id}
							categoryDivide={name}
							name={current.name}
							key={current.name}
							isChangeCategory={isChangeCategory}
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
					margin-bottom: 2px;
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
					padding: 6px 0 6px 15%;
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
