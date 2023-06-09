import axios from 'axios';
import { setTokenHeaders } from '../login/loginCheck';

const bringScrapListData = async (pageNumber = 0, pageSize = 10) => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        params: {
          "page": pageNumber,
          "size": pageSize,
        },
        headers: headers
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const bringScrapOriginalListData = async (scrapId) => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps/${scrapId}`,
      {
        headers: headers
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }  
}
  
export { bringScrapListData, bringScrapOriginalListData };