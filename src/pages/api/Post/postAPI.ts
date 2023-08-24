import axios from 'axios';
import { setTokenHeaders } from '../login/loginCheck';
import axiosInstance from '../axiosInstance';
// import { setTokenHeaders } from '../apiGetTokenHeader';

const baseUrl = 'https://bstaging.interviewbank.net/interview';
// const headers = setTokenHeaders();

const postInterview = async (postTitle: string, postObject: { interviewPeriod: string; careerYear: string; firstLevelId: number; secondLevelId: number; }, postArray: []) => {
  const {
    interviewPeriod,
    careerYear,
    firstLevelId,
    secondLevelId,
  } = postObject;

  const postData = {
    interviewPeriod,
    careerYear,
    jobCategoryId: secondLevelId ? Number(firstLevelId) : Number(secondLevelId),
    questionsRequest: {
      questions: postArray,
    },
    title: postTitle,
  }

  try {
    const response = await axiosInstance.post(
      baseUrl,
      postData
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { postInterview };