import axios from 'axios';
import { setTokenHeaders } from '../login/loginCheck';

const bringMyPostListData = async (scrapParam, pageSize = 15) => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/interview/me`,
      {
        params: {
          page: scrapParam.page-1,
          size: pageSize,
        },
        headers : headers
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const bringMyScrapListData = async (scrapParam, pageSize = 15) => {  
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        params: {
          page: scrapParam.page-1,
          size: pageSize,
        },
        headers : headers
      }
    );    
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { bringMyPostListData, bringMyScrapListData };