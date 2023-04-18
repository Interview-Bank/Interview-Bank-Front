import React from "react";

const SearchCategoryCheckBoxItem = ({
	category,
	name,
	categoryDivide,
	isChangeCategory,
}) => {
	return (
		<li onClick={(e) => isChangeCategory(category, e.target.getAttribute("name"))}>
			<label
				htmlFor={category}
				style={{ width: "100%", fontSize: "0.83em", display: "block" }}
			>
				<input
					type="checkbox"
					name={categoryDivide}
					value={category}
					id={category}
				/>
				{name}
			</label>
		</li>
	);
};

export default SearchCategoryCheckBoxItem;
