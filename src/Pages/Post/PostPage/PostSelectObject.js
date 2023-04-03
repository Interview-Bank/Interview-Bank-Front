const InterviewPeriod = [
	{
		id: 1,
		name: "예상면접",
		value: "EXPECTED_INTERVIEW"
	},
	{
		id: 2,
		name: "23년 상반기",
		value: "TWENTY_THREE1H"
	},
	{
		id: 3,
		name: "22년 하반기",
		value: "TWENTY_TWO2H"
	},
	{
		id: 4,
		name: "22년 상반기",
		value: "TWENTY_TWO1H"
	},
	{
		id: 5,
		name: "21년 하반기",
		value: "TWENTY_ONE2H"
	},
	{
		id: 6,
		name: "21년 상반기",
		value: "TWENTY_ONE1H"
	},
	{
		id: 7,
		name: "20년 하반기",
		value: "TWENTY2H"
	},
	{
		id: 8,
		name: "20년 상반기",
		value: "TWENTY1H"
	},
	{
		id: 9,
		name: "기타",
		value: "ETC"
	},
];

const CareerAge = [
	{
		id: 1,
		name: "신입",
		value: "NEWCOMER"
	},
	{
		id: 2,
		name: "1년",
		value: "ONE_YEAR"
	},
	{
		id: 3,
		name: "2년",
		value: "TWO_YEAR"
	},
	{
		id: 4,
		name: "3년",
		value: "THREE_YEAR"
	},
	{
		id: 5,
		name: "4년",
		value: "FOUR_YEAR"
	},
	{
		id: 6,
		name: "기타",
		value: "ETC"
	},
];

const PrimaryJobCategory = [
	{
		id: 1,
		name: "개발",
		parent_id: null,
	},
	{
		id: 2,
		name: "R&D",
		parent_id: null,
	},
	{
		id: 3,
		name: "디자인",
		parent_id: null,
	},
	{
		id: 4,
		name: "기획/PM",
		parent_id: null,
	},
	{
		id: 5,
		name: "마케팅",
		parent_id: null,
	},
	{
		id: 6,
		name: "기타",
		parent_id: null,
	},
];

const SecondaryJobCategory = [
	{
		id: 7,
		name: "백엔드",
		parent_id: 1,
	},
];

export { InterviewPeriod, CareerAge, PrimaryJobCategory, SecondaryJobCategory }