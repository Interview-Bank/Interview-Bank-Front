import React, { useState } from "react";
import ArrowDown from "../../../Assets/Images/Icons/arrow_down.png";

const PostSelectBox = ({
	selectSection,
	selectTitle,
	selectArray,
	isChangeSelectBoxItems,
}) => {
	const [selectActive, setSelectActive] = useState(false);
	return (
		<ul
			className={selectActive ? "ul__select active" : "ul__select"}
			onClick={() => {
				if (!(selectSection === "secondLevelId" && !selectArray.length))
					setSelectActive((prev) => !prev);
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
				className={selectActive ? "select__option active" : "select__option"}
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
					<img src={ArrowDown} alt="화살표" />
				) : null}
			</button>
			<style jsx>{`
				.ul__select {
					width: calc(25% - 60px - 1px);
					max-height: 66px;
					padding: 0px 30px;
					color: #5c5c5c;
					border-top: 0;
					border-bottom: 0;
					border-left: 0;
					cursor: pointer;
					border-right: 1px solid #ddd;
					position: relative;
					overflow-y: hidden;
				}
				.select__option {
					position: absolute;
					top: 0;
					left: 0;
					width: calc(100% - 30px * 2);
					max-height: 0;
					opacity: 0;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
					border-radius: 8px;
					background-color: white;
					z-index: 7;
				}
				.select__option.active {
					max-height: calc(100em / 5);
					padding: 0 30px;
					opacity: 1;
					overflow-y: auto;
				}
				.select__option > p {
					width: 100%;
					height: 52px;
					line-height: 52px;
					margin: 0;
				}
				.ul__select.active {
					max-height: 100em;
					overflow-y: unset;
				}
				.ul__select:nth-child(4) {
					border-right: 0;
				}
				.ul__select > p {
					width: 100%;
					height: 100%;
					margin: 0;
					line-height: 52px;
				}
				.ul__select.active > p {
					opacity: 0;
				}
				.ul__select > li {
					width: 100%;
					height: 52px;
					line-height: 52px;
				}
				.btn__arrow {
					position: absolute;
					margin: 0;
					padding: 0;
					top: 16px;
					right: 22px;
					border: 0;
					background-color: transparent;
				}
				ul,
				li {
					list-style: none;
					margin: 0;
					padding: 0;
				}

				.font-grey {
					color: #ddd;
				}
			`}</style>
		</ul>
	);
};

export default PostSelectBox;
