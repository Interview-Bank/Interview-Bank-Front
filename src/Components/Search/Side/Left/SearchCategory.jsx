import React, { useEffect, useState } from 'react';
import { getJobCategories, getFirstJobCategories } from '../../../../Pages/api/Post/jobCategoryAPI';
import SearchCategoryCheckBox from './SearchCategoryCheckBox';

const SearchCategory = ({ isChangeCategory }) => {
  const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

  useEffect(() => {
    getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
  },[])

	return (
		<>
			<h2>직무 구분</h2>
			{getFirstJobCategories(jobCategoriesArray) &&
				getFirstJobCategories(jobCategoriesArray).map((current) => (
					<SearchCategoryCheckBox
						data={current}
						key={current.id}
						isChangeCategory={isChangeCategory}
					/>
				))}
		</>
	);
};

export default SearchCategory;