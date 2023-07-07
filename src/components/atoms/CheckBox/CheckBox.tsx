

interface CheckBoxProps {
	category: string;
	name: string;
	categoryDivide: string;
	isChangeCategory: (dataName: string, categroy: string, name: string) => {};
}

const CheckBox = ({category, name, categoryDivide, isChangeCategory}: CheckBoxProps) => {
  return (
    <li onClick={(e) => isChangeCategory(e.target.getAttribute("data-name"), category, e.target.getAttribute("name"))}>
			<label
				htmlFor={category}
				style={{ width: "100%", fontSize: "0.83em", display: "block" }}
			>
				<input
					type="checkbox"
					name={categoryDivide}
					value={category}
					id={category}
					data-name={name}
				/>
				{name}
			</label>
		</li>
  )
}

export { CheckBox };