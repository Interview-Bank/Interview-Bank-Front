import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import React, { useEffect, useState } from 'react';
import { BoxTitle } from '@/components/atoms';
import { SearchCategoryCheckBox } from '../SearchCategoryCheckBox';

interface SearchCategoryProps {
	isChangeCategory		: (name: string, value: string, parent: string) => void;
	resetSearchParams		: (value: string) => void;
	searchDetail: {
		title: string;
    category: string;
    interviewPeriod: string;
    startDate: string;
    endDate: string;
    careerYear: string;
    page: number;
	};
}

const SearchCategory = ({ isChangeCategory, resetSearchParams, searchDetail }: SearchCategoryProps) => {
	const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

  useEffect(() => {
    getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
  },[])

	return (
    <>
			<BoxTitle title="직무 구분" field="CATEGORIES" resetSearchParams={resetSearchParams} />
			{getFirstJobCategories(jobCategoriesArray) &&
				getFirstJobCategories(jobCategoriesArray).map((current, index) => (
					<SearchCategoryCheckBox
						data={current}
						key={`${current.name},${current.id}`}
						isChangeCategory={isChangeCategory}
						secondJobCategories={getSecondJobCategories(jobCategoriesArray, current.id)}
						searchDetail={searchDetail}
						type={index}
					/>
				))}
		</>
	);
};

export { SearchCategory };