import React, { useState } from "react";
import ArrowDown from "public/Icons/arrow_down.png";
import ArrowUp from "public/Icons/arrow_up.png";
import styles from './Select.module.scss';
import Image from 'next/image';

interface SelectProps {
	selectTitle: string;
	selectArray: [];
	isChangeSelectBoxItems: (name: any) => void;
}

const Select = ({
	selectSection,
	selectTitle,
	selectArray,
	selectActive,
	isChangeSelectActive,
	isChangeSelectBoxItems,
}) => {
	return (
		<ul
			className={
				selectActive[selectSection] ? `${styles.ul__select} ${styles.active}` : styles.ul__select
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

// const Select = ({
// 	selectTitle,
// 	selectArray,
// 	isChangeSelectBoxItems,
// }: SelectProps) => {
// 	const [selectActive, setSelectActive] = useState(false);

// 	return (
// 		<ul
// 			className={selectActive ? `${styles.ul__select} ${styles.active}` : styles.ul__select}
// 			onClick={() => setSelectActive((prev) => !prev)}
// 		>
// 			<p>{selectTitle}</p>
// 			<div
// 				className={selectActive ? `${styles.select__option} ${styles.active}` : styles.select__option}
// 			>
// 				<p
// 					data-id=""
// 					onClick={(e) => isChangeSelectBoxItems(e.currentTarget.getAttribute("data-id"))}
// 				>
// 					선택하세요
// 				</p>
// 				{selectArray &&
// 					selectArray.map((current) => (
// 						<p
// 							key={current.id}
// 							data-id={current.id}
// 							onClick={(e) =>
// 								isChangeSelectBoxItems(e.currentTarget.getAttribute("data-id"))
// 							}
// 						>
// 							{current.name}
// 						</p>
// 					))}
// 			</div>
//       <button className={styles.btn__arrow}>
// 				{selectActive
// 					? <Image src={ArrowUp} alt="화살표" />
// 					: <Image src={ArrowDown} alt="화살표" />
// 				}
// 			</button>
// 		</ul>
// 	);
// };

export { Select };