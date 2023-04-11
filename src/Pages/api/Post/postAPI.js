import axios from 'axios';
import { setTokenHeaders } from '../apiGetTokenHeader';

const baseUrl = 'https://bstaging.interviewbank.net/interview';
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
      baseUrl,
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