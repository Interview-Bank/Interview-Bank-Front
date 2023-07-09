import { getFirstJobCategories, getJobCategories, getSecondJobCategories } from '@/pages/api/Post/jobCategoryAPI';
import React, { useEffect, useState } from 'react';
import { BoxTitle } from '@/components/atoms';
import { SearchCategoryCheckBox } from '../SearchCategoryCheckBox';

const SearchCategory = ({ isChangeCategory, resetSearchParams, searchDetail }) => {
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