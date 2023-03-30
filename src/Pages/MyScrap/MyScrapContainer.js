import React, { useState, useEffect } from "react";
import axios from "axios";
import MyScrapView from "./MyScrapView";
import { setTokenHeaders } from '../api/apiGetTokenHeader';

const MyScrapContainer = () => {
  const [scrapList, setScrapList] = useState([]);
  const headers = setTokenHeaders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10;
        let pageNumber = 0;
        let data = [];
        do {
          console.log(pageNumber);
          const response = await axios.get(
            `https://bstaging.interviewbank.net/scraps?page=${pageNumber}&size=${pageSize}`,
            headers
          );
          data = response.data;
          allData = [...allData, ...data];
          setScrapList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setScrapList(allData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <MyScrapView scrapList={scrapList} />;
};

export default MyScrapContainer;
