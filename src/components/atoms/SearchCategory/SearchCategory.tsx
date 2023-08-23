import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import React, { useEffect, useState } from 'react';
import { BoxTitle } from '@/components/atoms';
import { SearchCategoryCheckBox } from '../SearchCategoryCheckBox';

export interface SearchCategoryCommonProps {
	isChangeCategory		: (name: string | null, value: string, parent: string | null) => void;
	searchDetail				: string | null;
}

export interface ResetSearchCategoryProps {
	resetSearchParams	  : (value: string) => void;
}

interface SearchCategoryProps extends SearchCategoryCommonProps, ResetSearchCategoryProps {
}

const SearchCategory = ({ isChangeCategory, resetSearchParams, searchDetail }: SearchCategoryProps) => {
	const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

  useEffect(() => {
    getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
	}, [])

	console.log(getSecondJobCategories(jobCategoriesArray, 1))

	return (
    <>
			<BoxTitle title="직무 구분" field="CATEGORIES" resetSearchParams={resetSearchParams} />
			{getFirstJobCategories(jobCategoriesArray) &&
				getFirstJobCategories(jobCategoriesArray).map((current: {id:number, name:string}, index: number) => (
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