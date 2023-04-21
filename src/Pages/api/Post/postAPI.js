import axios from 'axios';
import { setTokenHeaders } from '../apiGetTokenHeader';

const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL

const headers = setTokenHeaders();

const postInterview = async (postTitle, postObject, postArray) => {
  const {
    interviewPeriod,
    careerYear,
    firstLevelId,
    secondLevelId,
  } = postObject;

  const postData = {
    interviewPeriod,
    careerYear,
    jobCategoryId: secondLevelId === "" ? Number(firstLevelId) : Number(secondLevelId),
    questionsRequest: {
      questions: postArray,
    },
    title: postTitle,
  }

  try {
    const response = await axios.post(
      InterviewBaseUrl,
      postData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export { postInterview };