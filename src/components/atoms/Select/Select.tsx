import React from "react";
import ArrowDown from "public/Icons/arrow_down.png";
import styles from './Select.module.scss';
import Image from 'next/image';

interface SelectProps {
	selectTitle								: string;
	selectArray								: {
																name: string;
																id: string;
															}[];
	isChangeSelectBoxItems		: (name: string, value: string) => void;
	selectSection						 	: string;
	selectActive						 ?: boolean;
	isChangeSelectActive		 	: (name: string) => void;
}

const Select = ({
	selectTitle,
	selectArray,
	isChangeSelectBoxItems,
	selectSection,
	selectActive,
	isChangeSelectActive,
}: SelectProps) => {
	return (
		<ul
			className={
				`${styles.select} ${selectActive ? styles['select--active'] : undefined}`
			}
			onClick={() => {
				if (!(selectSection === "secondLevelId" && !selectArray.length))
					isChangeSelectActive(selectSection);
			}}
		>
			<p
				className={
					selectSection === "secondLevelId"
						? !selectArray.length
							? styles['font-grey']
							: undefined
						: undefined
				}
			>
				{selectTitle}
			</p>
			<div
				className={`${styles.select__option} ${selectActive ? styles['select__option--active'] : undefined}`}>
				<p
					data-id=""
					onClick={(e) =>
						isChangeSelectBoxItems(
							selectSection,
							e.currentTarget.getAttribute("data-id") || ''
						)
					}
				>
					선택하세요
				</p>
				{selectArray &&
					selectArray.map((current) => (
						<p
							key={current.id}
							data-id={current.id}
							onClick={(e) =>
								isChangeSelectBoxItems(
									selectSection,
									e.currentTarget.getAttribute("data-id") || ''
								)
							}
						>
							{current.name}
						</p>
					))}
			</div>
			<button className={styles.btn__arrow}>
				{!(selectSection === "secondLevelId" && !selectArray.length) ? (
					<Image src={ArrowDown} alt="화살표" />
				) : null}
			</button>
		</ul>
	);
};

export { Select };