import React from "react";

const SearchCategoryCheckBoxItem = ({
	category,
	name,
	categoryDivide,
	isChangeSelectCategories,
}) => {
	return (
		<li>
			<label
				for={category}
				style={{ width: "100%", fontSize: "0.83em", display: "block" }}
				onClick={() => isChangeSelectCategories(category)}
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
