import axios from 'axios';
import React from 'react'
import { setTokenHeaders } from '../../apiGetTokenHeader';

const baseUrl = `https://bstaging.interviewbank.net/interview/me`
const headers = setTokenHeaders();

const bringMyPostListData = async (scrapParam, pageSize = 15) => {
    console.log(scrapParam);
    console.log(headers)

    try {
      const response = await axios.get(
        baseUrl,
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

export default bringMyPostListData