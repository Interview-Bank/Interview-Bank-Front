import React, { useState } from "react";
import ArrowDown from "../../../../Assets/Images/Icons/arrow_down.png";
import ArrowUp from "../../../../Assets/Images/Icons/arrow_up.png";

const SearchSelectBox = ({
	selectTitle,
	selectArray,
	isChangeSelectBoxItems,
}) => {
	const [selectActive, setSelectActive] = useState(false);
	return (
		<ul
			className={selectActive ? "ul__select active" : "ul__select"}
			onClick={() => {
				setSelectActive((prev) => !prev);
			}}
		>
			<p>{selectTitle}</p>
			<div
				className={selectActive ? "select__option active" : "select__option"}
			>
				<p
					data-id=""
					onClick={(e) => isChangeSelectBoxItems(e.target.getAttribute("data-id"))}
				>
					선택하세요
				</p>
				{selectArray &&
					selectArray.map((current) => (
						<p
							key={current.id}
							data-id={current.id}
							onClick={(e) =>
								isChangeSelectBoxItems(e.target.getAttribute("data-id"))
							}
						>
							{current.name}
						</p>
					))}
			</div>
			<button className="btn__arrow">
				{selectActive
					? <img src={ArrowUp} alt="화살표" />
					: <img src={ArrowDown} alt="화살표" />
				}
			</button>
			<style jsx>{`
				.ul__select {
					width: calc(100% - 32px - 1px);
					max-height: 40px;
					padding: 0px 16px;
					color: #5c5c5c;
					border-top: 0;
					border-bottom: 0;
					border-left: 0;
					cursor: pointer;
					position: relative;
					overflow-y: hidden;
					border-radius: 8px;
					border: 1px solid #aaa;
				}
				.select__option {
					position: absolute;
					top: 0;
					left: 0;
					width: calc(100% - 16px * 2);
					max-height: 0;
					opacity: 0;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
					border-radius: 8px;
					background-color: white;
					z-index: 7;
				}
				.select__option.active {
					max-height: calc(100em / 4);
					padding: 0 16px;
					opacity: 1;
					overflow-y: auto;
				}
				.select__option > p {
					width: 100%;
					height: 40px;
					line-height: 40px;
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
					font-size: 0.83em;
					line-height: 40px;
				}
				.ul__select.active > p {
					opacity: 0;
				}
				.ul__select > li {
					width: 100%;
					height: 66px;
					line-height: 66px;
				}
				.ul__select > .btn__arrow {
					position: absolute;
					margin: 0;
					padding: 0;
					top: 11px;
					right: 11px;
					border: 0;
					background-color: transparent;
				}
				.search__item-area > .ul__select {
					border-radius: 4px;
				}
				.search__item-area > .ul__select.active > p {
					opacity: 1
				}
				.search__item-area > .ul__select > .select__option {
					top: 41px;
					border-radius: 4px;
				}
				.search__item-area > .ul__select > .select__option.active {
					max-height: calc(100em / 9);
				}
				.search__item-area > .ul__select > .select__option > p{
					font-size: 0.83em;
					height: 46px;
				}
				ul,
				li {
					list-style: none;
					margin: 0;
					padding: 0;
				}
			`}</style>
		</ul>
	);
};

export default SearchSelectBox;
