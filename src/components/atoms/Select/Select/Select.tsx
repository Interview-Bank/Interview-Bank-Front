import React, { useState } from "react";
import ArrowDown from "public/Icons/arrow_down.png";
import ArrowUp from "public/Icons/arrow_up.png";
import styles from './Select.module.scss';
import Image from 'next/image';

interface SelectProps {
	selectTitle: string;
	selectArray: [];
	isChangeSelectBoxItems: (name: any) => void;
	selectSection?: string;
	selectActive?: boolean;
	isChangeSelectActive?: () => void;
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
				`${styles.ul__select} ${selectActive[selectSection] && styles['ul__select--active']}`
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
							: null
						: null
				}
			>
				{selectTitle}
			</p>
			<div
				className={
					selectActive[selectSection]
						? `${styles.select__option} ${styles.active}`
						: styles.select__option
				}
			>
				<p
					data-id=""
					onClick={(e) =>
						isChangeSelectBoxItems(
							selectSection,
							e.target.getAttribute("data-id")
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
									e.target.getAttribute("data-id")
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