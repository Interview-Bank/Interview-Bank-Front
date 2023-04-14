import React, { useState } from "react";

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
				setSelectActive((prev) => !prev);
			}}
		>
			<p>{selectTitle}</p>
			<div
				className={selectActive ? "select__option active" : "select__option"}
			>
				<p
					id=""
					onClick={(e) => isChangeSelectBoxItems(selectSection, e.target.id)}
				>
					선택하세요
				</p>
				{selectArray &&
					selectArray.map((current) => (
						<p
							key={current.id}
							id={
								selectTitle === "면접 시기" || selectTitle === "경력"
									? current.value
									: current.id
							}
							onClick={(e) =>
								isChangeSelectBoxItems(selectSection, e.target.id)
							}
						>
							{current.name}
						</p>
					))}
			</div>
			<button className="btn__arrow">{">"}</button>
			<style jsx>{`
				.ul__select {
					width: calc(25% - 60px - 3px);
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
					max-height: calc(100em / 3);
					padding: 0 30px;
					opacity: 1;
					overflow-y: auto;
				}
				.select__option > p {
					width: 100%;
					height: 66px;
					line-height: 66px;
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
					line-height: 66px;
				}
				.ul__select.active > p {
					opacity: 0;
				}
				.ul__select > li {
					width: 100%;
					height: 66px;
					line-height: 66px;
				}
				.btn__arrow {
					position: absolute;
					margin: 0;
					padding: 0;
					top: 25px;
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
			`}</style>
		</ul>
	);
};

export default PostSelectBox;
