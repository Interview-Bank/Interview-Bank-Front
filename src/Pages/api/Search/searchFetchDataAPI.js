import axios from 'axios';
import { getDateFormatString } from '../dateConvert';

const baseUrl = `https://bstaging.interviewbank.net/interview/search`

const bringSearchInterviewListData = async (searchParam, pageSize = 10, pageNumber = 0) => {
    try {
      const response = await axios.get(
        baseUrl,
        {
          params: {
            "query": searchParam.title,
            "job-categories": searchParam.category,
            "created-start-date": searchParam.startDate !== "" ? getDateFormatString(searchParam.startDate) : "",
            "created-end-date": searchParam.endDate !== "" ? getDateFormatString(searchParam.endDate) : ""
          }
        }
      );
      return response.data.interviews;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { bringSearchInterviewListData }