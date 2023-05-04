import React from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from 'public/Icons/calendar.png'
import { SearchLeftTitle } from '../SearchLeftTitle';
import { Radio } from '../Radio';
import Image from 'next/image';
import styles from './SearchDateInput.module.scss';

const SearchDateInput = ({
	searchRadio,
	startDate,
	endDate,
	isChangeCreatedDateRadio,
	isChangeStrDate,
	isChangeEndDate,
	resetSearchParams
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
		<div className={styles.date}>
			<SearchLeftTitle title="작성기간" field="CREATEDAT" resetSearchParams={resetSearchParams}/>
			<div className={styles.radio}>
				{DateRadioArray.map((current, index) =>
					<Radio type="createdAt" name={current.name} id={current.id} key={index} searchRadio={searchRadio} isChangeCreatedDateRadio={isChangeCreatedDateRadio} />
				)}
			</div>
      <div className={styles.area}>
				<div className={styles.picker}>
					<DatePicker
						selected={startDate}
						onChange={(date) => isChangeStrDate(date)}
						locale={ko}
						dateFormat="yyyy-MM-dd"
						className={searchRadio==="DIRECT_SELECT" ? styles.input : `${styles.input} ${styles.readonly}`}
						readOnly={searchRadio==="DIRECT_SELECT" ? false : true}
					/>
					<Image src={CalendarIcon} alt="달력 아이콘" />
				</div>
				<span> ~ </span>
				<div className={styles.picker}>
					<DatePicker
						selected={endDate}
						onChange={(date) => isChangeEndDate(date)}
						locale={ko}
						dateFormat="yyyy-MM-dd"
						className={searchRadio==="DIRECT_SELECT" ? styles.input : `${styles.input} ${styles.readonly}`}
						readOnly={searchRadio==="DIRECT_SELECT" ? false : true}
					/>
					<Image src={CalendarIcon} alt="달력 아이콘" />
				</div>
			</div>
		</div>		
	);
};

export { SearchDateInput };
