import React, { useEffect, useState } from 'react';
import { getJobCategories, getFirstJobCategories, getSecondJobCategories } from '../../../../Pages/api/Post/jobCategoryAPI';
import SearchCategoryCheckBox from './SearchCategoryCheckBox';
import SearchLeftTitle from './SearchLeftTitle';

const SearchCategory = ({ isChangeCategory }) => {
  const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

  useEffect(() => {
    getJobCategories()
			.then((result) => setJobCategoriesArray(result))
			.catch((resolve) => resolve);
  },[])

	return (
    <>
      <SearchLeftTitle title="직무 구분" />
			{getFirstJobCategories(jobCategoriesArray) &&
				getFirstJobCategories(jobCategoriesArray).map((current) => (
					<SearchCategoryCheckBox
						data={current}
						key={`${current.name},${current.id}`}
            isChangeCategory={isChangeCategory}
            secondJobCategories={getSecondJobCategories(jobCategoriesArray, current.id)}
					/>
				))}
		</>
	);
};

export default SearchCategory;