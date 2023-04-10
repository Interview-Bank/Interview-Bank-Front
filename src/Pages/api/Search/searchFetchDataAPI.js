import axios from 'axios';

const baseUrl = `https://bstaging.interviewbank.net/interview`

const bringSearchInterviewListData = async (pageSize = 10, pageNumber = 0) => {
    try {
      const response = await axios.get(
        baseUrl, { params: { page: pageNumber, size: pageSize } }
      );
      return response.data.interviews;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { bringSearchInterviewListData }