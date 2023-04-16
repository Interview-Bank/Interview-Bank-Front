import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import SearchLeftTitle from "./SearchLeftTitle";

const SearchDateInput = ({
	startDate,
	endDate,
	isChangeStrDate,
	isChangeEndDate,
}) => {
	// const [date, setDate] = useState(defaultValue);
	return (
		<>
			<SearchLeftTitle title="기간" />
			<div className="date__area">
				<DatePicker
					selected={startDate}
					onChange={(date) => isChangeStrDate(date)}
					locale={ko}
					dateFormat="yyyy-MM-dd"
					className="date__input"
					// readOnly={true}
				/>
				<span> ~ </span>
				<DatePicker
					selected={endDate}
					onChange={(date) => isChangeEndDate(date)}
					locale={ko}
					dateFormat="yyyy-MM-dd"
					className="date__input"
				/>
			</div>
			<style jsx>{`
				.react-datepicker__input-container > input {
					width: 100%;
					border: 0px solid transparent;
					padding: 0;
					height: 40px;
					font-size: 1.1rem;
				}

				.date__area {
					display: flex;
				}

				.date__area > span {
					line-height: 42px;
					margin: 0 5px;
				}

				.react-datepicker__input-container {
					width: calc(100% - 20px);
				}

				.react-datepicker__current-month {
					color: white;
					height: 40px;
					line-height: 30px;
				}

				.react-datepicker__navigation--next,
				.react-datepicker__navigation--previous {
					top: 8px;
				}

				.react-datepicker__day--selected {
					border-radius: 50%;
					background-color: #2e55e7;
				}

				.react-datepicker__header {
					background-color: #2e55e7;
					border-bottom: 0;
				}

				.react-datepicker__day-names {
					background-color: white;
				}

				.react-datepicker__day-name {
					color: black;
					font-weight: 700;
				}
				.react-datepicker__input-container > input {
					font-size: 0.83em;
					border: 1px solid #aaa;
					border-radius: 4px;
					padding: 0 10px;
				}
			`}</style>
		</>
		// <div>SearchDateInput</div>
	);
};

export default SearchDateInput;
