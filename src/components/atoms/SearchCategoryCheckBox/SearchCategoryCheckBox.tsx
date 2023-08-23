import React, { useState } from "react";
import ArrowUp from "public/Icons/arrow_up.png";
import ArrowDown from "public/Icons/arrow_down.png";
import { CheckBox } from '../CheckBox';
import styles from './SearchCategoryCheckBox.module.scss';
import Image from 'next/image';
import { Label } from '../Label';
import { SearchCategoryProps } from '../SearchCategory/SearchCategory';

interface SearchCategoriesCommonProps extends SearchCategoryProps {
	secondJobCategories: { id: number, name: string }[];
	type: number;
}

interface SearchCategoryCheckBoxProps extends SearchCategoriesCommonProps {
	data: { id: number, name: string };
}

interface FirstSearchCategoriesCheckBoxProps extends SearchCategoriesCommonProps {
	category: string;
	name: string;
	toggle: boolean;
	setToggle: () => void;
}

const FirstSearchCategoriesCheckBox = ({
	category,
	name,
	toggle,
	setToggle,
	secondJobCategories,
	isChangeCategory,
	searchDetail,
	type = 0,
}: FirstSearchCategoriesCheckBoxProps) => {
  return (
    <div className={styles.select}>
			<label
				htmlFor={category}
				style={{ width: "calc(100% - 13px - 24px)", fontSize: "0.83em" }}
				onClick={(e) => isChangeCategory(e.currentTarget.getAttribute('data-name'), category, e.currentTarget.getAttribute("name"))}
			>
				<input type="checkbox" name={name} value={category} id={category} data-name={name} />
				{name}
				{(searchDetail && type === 0)
					&& <Label text={searchDetail} />}
			</label>
			{secondJobCategories.length ? (
				<button
					className={styles.arrow}
					onClick={() => setToggle()}
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
	searchDetail,
	type,
}: SearchCategoryCheckBoxProps) => {
	const [toggle, setToggle] = useState(false);
	const { name, id } = data;

	const changeToggleEvent = () => {
		setToggle((prev) => !prev);
	}

	return (
    <div className={styles.area}>
			<FirstSearchCategoriesCheckBox
				category={id.toString()}
				name={name}
				toggle={toggle}
				setToggle={changeToggleEvent}
				secondJobCategories={secondJobCategories}
				isChangeCategory={isChangeCategory}
				searchDetail={searchDetail}
				type={type}
			/>
			<ul className={toggle ? `${styles.acordian} ${styles.active}` : styles.acordian}>
				{secondJobCategories &&
					secondJobCategories.map((current) => (
						<CheckBox
							category={current.id.toString()}
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
