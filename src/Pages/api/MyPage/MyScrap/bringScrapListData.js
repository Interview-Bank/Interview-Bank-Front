import axios from 'axios';
import React from 'react'
import { setTokenHeaders } from '../../apiGetTokenHeader';

const ScrapBaseUrl = process.env.REACT_APP_API_SCRAP_BASE_URL
const headers = setTokenHeaders();

const bringScrapListData = async (scrapParam, pageSize = 15) => {
    console.log(scrapParam);
    console.log(headers)

    try {
      const response = await axios.get(
        ScrapBaseUrl,
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

export default bringScrapListData