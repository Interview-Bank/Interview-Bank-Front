import { InterviewPeriod } from './Post/PostSelectObject';

const getInterviewNameFromValue = (value) => {
  return value !== "" && InterviewPeriod.find(current=>current.id === value).name;
}

export { getInterviewNameFromValue };