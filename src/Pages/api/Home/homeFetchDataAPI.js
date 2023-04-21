import axios from 'axios';

const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL

const bringHomeInterviewListData = async (pageSize = 10, pageNumber = 0) => {
    try {
      const response = await axios.get(
        InterviewBaseUrl, { params: { page: pageNumber, size: pageSize } }
      );
      return response.data.interviews;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { bringHomeInterviewListData }