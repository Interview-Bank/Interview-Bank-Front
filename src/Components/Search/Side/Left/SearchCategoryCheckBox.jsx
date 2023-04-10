import React, { useState, useCallback } from 'react';

const SearchCategoryCheckBox = ({ data, isChangeCategory }) => {
	const [toggle, setToggle] = useState(false);
	const { name, category } = data;
	const onClick = useCallback((value) => {
		isChangeCategory(value);
	}, []);
	return (
		<div className="check__area" onClick={() => onClick(category)}>
			<div className="check__select" onClick={() => setToggle((prev) => !prev)}>
				<input type="radio" name="category" value={category} />
				<label for={category} style={{ width: "calc(100% - 13px - 24px)" }}>
					{name}
				</label>
				<button className="btn__arrow">{">"}</button>
			</div>
			<ul className={toggle ? "acordian active" : "acordian"}>
				<li>1</li>
				<li>1</li>
				<li>1</li>
			</ul>
			<style jsx>{`
				.check__area {
					position: relative;
					display: flex;
					width: 100%;
					margin-bottom: 10px;
					align-items: center;
					flex-wrap: wrap;
					cursor: pointer;
				}
				.check__select {
					cursor: pointer;
					width: 100%;
					display: flex;
          
				}

				.acordian {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					align-items: center;
					max-height: 0;
					// opacity: 0;
					overflow-y: hidden;
					transition: all 0.2s ease-out;
				}
				.acordian.active {
					max-height: 100em;
				}
				label {
					padding-left: 13px;
				}
				.btn__arrow {
					position: absolute;
					border: 0;
					background-color: transparent;
					right: 0;
					// top: 6px;
				}
				li {
					width: calc(100% - 15%);
					padding-left: 15%;
				}
			`}</style>
		</div>
	);
};

export default SearchCategoryCheckBox;