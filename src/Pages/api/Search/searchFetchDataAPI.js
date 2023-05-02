import axios from 'axios';
import { getDateFormatString } from '../dateConvert';

const baseUrl = `https://bstaging.interviewbank.net/interview/search`
const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL

const bringSearchInterviewListData = async (searchParam, pageSize = 15) => {
  console.log(searchParam);
    try {
      const response = await axios.get(
        `${InterviewBaseUrl}/search`,
        {
          params: {
            "query": searchParam.title,
            "job-categories": searchParam.category,
            "created-start-date": searchParam.startDate !== "" ? getDateFormatString(searchParam.startDate) : "",
            "created-end-date": searchParam.endDate !== "" ? getDateFormatString(searchParam.endDate) : "",
            "interview-period": searchParam.interviewPeriod,
            "career-year": searchParam.careerYear,
            page: searchParam.page-1,
            size: pageSize,
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { bringSearchInterviewListData }