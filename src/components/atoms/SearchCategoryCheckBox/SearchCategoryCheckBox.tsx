import React, { useState } from "react";
import ArrowUp from "public/Icons/arrow_up.png";
import ArrowDown from "public/Icons/arrow_down.png";
import { CheckBox } from '../CheckBox';
import styles from './SearchCategoryCheckBox.module.scss';
import Image from 'next/image';

const FirstSearchCategoriesCheckBox = ({
	category,
	name,
	toggle,
	setToggle,
	secondJobCategories,
	isChangeCategory,
}) => {
  return (
    <div className={styles.select}>
			<label
				htmlFor={category}
				style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em" }}
				onClick={(e) => isChangeCategory(e.target.getAttribute('data-name'), category, e.target.getAttribute("name"))}
			>
				<input type="checkbox" name={name} value={category} id={category} data-name={name} />
				{name}
			</label>
			{secondJobCategories.length ? (
				<button
					className={styles.arrow}
					onClick={() => setToggle((prev) => !prev)}
				>
					{toggle ? (
						<Image src={ArrowUp} alt="화살표" />
					) : (
						<Image src={ArrowDown} alt="화살표" />
					)}
				</button>
			) : null}
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
    <div className={styles.area}>
			<FirstSearchCategoriesCheckBox
				category={id}
				name={name}
				toggle={toggle}
				setToggle={setToggle}
				secondJobCategories={secondJobCategories}
				isChangeCategory={isChangeCategory}
			/>
			<ul className={toggle ? `${styles.acordian} ${styles.active}` : styles.acordian}>
				{secondJobCategories &&
					secondJobCategories.map((current) => (
						<CheckBox
							category={current.id}
							categoryDivide={name}
							name={current.name}
							key={current.name}
							isChangeCategory={isChangeCategory}
						/>
					))}
			</ul>
			{/* </ul> */}
		</div>
	);
};

export { SearchCategoryCheckBox };
