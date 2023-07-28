import React, { useState } from "react";
import ArrowDown from "public/Icons/arrow_down.png";
import ArrowUp from "public/Icons/arrow_up.png";
import styles from './SearchSelectBox.module.scss';
import Image from 'next/image';

interface SearchSelectBoxProps {
	selectTitle								: string;
	selectArray								: {
																name: string;
																id: string;
															}[];
	isChangeSelectBoxItems		: (name: string, value: string) => void;
	selectSection						 	: string;							
}

const SearchSelectBox = ({
	selectTitle,
	selectArray,
	isChangeSelectBoxItems,
	selectSection,
}: SearchSelectBoxProps) => {
	const [selectActive, setSelectActive] = useState(false);

	return (
		<ul
			className={`${styles.select} ${selectActive ? styles['select--active'] : undefined}`}
			onClick={() => setSelectActive((prev) => !prev)}
		>
			<p>{selectTitle}</p>
			<div className={`${styles.select__option} ${selectActive ? styles['select__option--active'] : undefined}`}>
				<p
					data-id=""
					onClick={(e) => isChangeSelectBoxItems(selectSection, e.currentTarget.getAttribute("data-id") || '')}
				>
					선택하세요
				</p>
				{selectArray &&
					selectArray.map((current) => (
						<p
							key				= {current.id}
							data-id		= {current.id}
							onClick		= {(e) => isChangeSelectBoxItems(selectSection, e.currentTarget.getAttribute("data-id") || '')}
						>
							{current.name}
						</p>
					))}
			</div>
      <button className={styles.btn__arrow}>
				{selectActive
					? <Image src={ArrowUp} alt="화살표" />
					: <Image src={ArrowDown} alt="화살표" />
				}
			</button>
		</ul>
	);
};

export { SearchSelectBox };
