import React from 'react'
import styles from './TreeSelect.module.scss';

interface TreeSelectProps {

}

const TreeSelect = ({
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
				selectActive[selectSection] ? `${styles.tree__select} ${styles.active}` : styles.tree__select
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
							? "font-grey"
							: null
						: null
				}
			>
				{selectTitle}
			</p>
			<div
				className={
					selectActive[selectSection]
						? "select__option active"
						: "select__option"
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
			<button className="btn__arrow">
				{!(selectSection === "secondLevelId" && !selectArray.length) ? (
					<Image src={ArrowDown} alt="화살표" />
				) : null}
			</button>
		</ul>
	);
};

export { TreeSelect };