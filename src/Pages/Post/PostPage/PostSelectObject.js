const InterviewPeriod = [
	{
		id: 1,
		name: "예상면접",
	},
	{
		id: 2,
		name: "22년 하반기",
	},
	{
		id: 3,
		name: "22년 상반기",
	},
	{
		id: 4,
		name: "21년 하반기",
	},
	{
		id: 5,
		name: "21년 상반기",
	},
	{
		id: 6,
		name: "20년 하반기",
	},
];

const CareerAge = [
	{
		id: 1,
		name: "신입",
	},
	{
		id: 2,
		name: "1년 이하",
	},
	{
		id: 3,
		name: "1년차",
	},
	{
		id: 4,
		name: "2년차",
	},
	{
		id: 5,
		name: "3년차",
	},
	{
		id: 6,
		name: "4년차",
	},
	{
		id: 7,
		name: "5년차",
	},
	{
		id: 8,
		name: "5년차 이상",
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