import axios from 'axios';
import { getDateFormatString } from '../dateConvert';

const bringSearchInterviewListData = async (searchParam, pageSize = 15) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/interview/search`,
        {
          params: {
            "query": searchParam.title,
            "job-categories": searchParam.category,
            "created-start-date": searchParam.startDate ? getDateFormatString(searchParam.startDate) : "",
            "created-end-date": searchParam.endDate ? getDateFormatString(searchParam.endDate) : "",
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