import { CareerYear } from './Post/PostSelectObject';

const getCareerYearNameFromValue = (value) => {
  return value !== "" && CareerYear.find(current=>current.id === value).name;
}

export { getCareerYearNameFromValue };