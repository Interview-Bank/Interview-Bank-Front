import React from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import SearchLeftTitle from "./SearchLeftTitle";
import SearchRadio from './SearchRadio';
import CalendarIcon from '../../../../Assets/Images/Icons/calendar.png'

const SearchDateInput = ({
	searchRadio,
	startDate,
	endDate,
	isChangeCreatedDateRadio,
	isChangeStrDate,
	isChangeEndDate,
}) => {
	const DateRadioArray = [
		{
			id: "ALL",
			name: "전체",
		},
		{
			id: "RECENT_1MONTH",
			name: "최근 1개월",
		},
		{
			id: "RECENT_3MONTH",
			name: "최근 3개월",
		},
		{
			id: "RECENT_6MONTH",
			name: "최근 6개월",
		},
		{
			id: "RECENT_1YEAR",
			name: "최근 1년",
		},
		{
			id: "DIRECT_SELECT",
			name: "직접 입력",
		},
	]
	return (
		<>
			<SearchLeftTitle title="작성기간" />
			<div className="date__radio">
				{DateRadioArray.map((current, index) =>
					<SearchRadio type="createdAt" name={current.name} id={current.id} key={index} searchRadio={searchRadio} isChangeCreatedDateRadio={isChangeCreatedDateRadio} />
				)}
			</div>
			<div className="date__area">
				<div className="date__picker">
					<DatePicker
						selected={startDate}
						onChange={(date) => isChangeStrDate(date)}
						locale={ko}
						dateFormat="yyyy-MM-dd"
						className={searchRadio==="DIRECT_SELECT" ? "date__input" : "date__input readonly"}
						readOnly={searchRadio==="DIRECT_SELECT" ? false : true}
					/>
					<img src={CalendarIcon} alt="달력 아이콘" />
				</div>
				<span> ~ </span>
				<div className="date__picker">
					<DatePicker
						selected={endDate}
						onChange={(date) => isChangeEndDate(date)}
						locale={ko}
						dateFormat="yyyy-MM-dd"
						className={searchRadio==="DIRECT_SELECT" ? "date__input" : "date__input readonly"}
						readOnly={searchRadio==="DIRECT_SELECT" ? false : true}
					/>
					<img src={CalendarIcon} alt="달력 아이콘" />
				</div>
			</div>
			<style jsx>{`
				.react-datepicker__input-container > input {
					width: 100%;
					border: 0px solid transparent;
					padding: 0;
					height: 40px;
					font-size: 1.1rem;
				}

				.date__radio {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
				}

				.date__radio > label {
					width: 100%;
					font-size: 0.83em;
					cursor: pointer;
				}

				.date__radio > label > input[type=radio] {
					padding: 0;
					margin: 6px 12px 6px 0;
				}

				.date__area {
					display: flex;
					// flex-wrap: wrap;
				}

				.date__area > span {
					line-height: 42px;
					margin: 0 5px;
				}

				.date__picker {
					position: relative;
				}

				.date__picker > img {
					position: absolute;
					top: 6.5px;
					left: 6px;
				}

				.date__input.readonly {
					background-color: #eee;
					color: #aaa;
				}

				.react-datepicker__input-container {
					width: calc(100% - 40px);
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
					padding: 0 10px 0 30px;
				}
			`}</style>
		</>
		// <div>SearchDateInput</div>
	);
};

export default SearchDateInput;
