import axios from 'axios';

const baseUrl = `https://bstaging.interviewbank.net/interview`

const bringHomeInterviewListData = async (pageSize = 12, pageNumber = 0) => {
    try {
      const response = await axios.get(
        baseUrl, { params: { page: pageNumber, size: pageSize } }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { bringHomeInterviewListData }