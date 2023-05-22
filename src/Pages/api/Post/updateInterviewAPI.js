import axios from 'axios';
import { setTokenHeaders } from '../apiGetTokenHeader';

const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL

const headers = setTokenHeaders();

const updateInterview = async (postTitle, postObject, postArray, interview_id) => {
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
    questions: postArray,
    title: postTitle,
  }
  console.log(interview_id)
  console.log(headers)
  console.log(postData)
  try {
    const response = await axios.put(
    `${InterviewBaseUrl}/${interview_id}`,
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

export { updateInterview };