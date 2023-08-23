

interface CheckBoxProps {
	category: string;
	name: string;
	categoryDivide: string;
	isChangeCategory: (dataName: string | null, categroy: string, name: string | null) => void;
}

const CheckBox = ({category, name, categoryDivide, isChangeCategory}: CheckBoxProps) => {
  return (
		<li>
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
					onChange={(e) => isChangeCategory(e.currentTarget.getAttribute("data-name"), category, e.currentTarget.getAttribute("name"))}
					readOnly
				/>
				{name}
			</label>
		</li>
  )
}

export { CheckBox };