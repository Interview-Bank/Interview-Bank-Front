import React, { useState, useEffect } from "react";
import axios from "axios";
import MyScrapView from "./MyScrapView";
import { setTokenHeaders } from '../../api/apiGetTokenHeader';

const MyScrapContainer = () => {
  const [scrapList, setScrapList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = setTokenHeaders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10;
        let pageNumber = 0;
        let data = [];
        do {
          const response = await axios.get(
            `https://bstaging.interviewbank.net/scraps?page=${pageNumber}&size=${pageSize}`,
            {headers}
          );
          data = response.data.scraps;
          allData = [...allData, ...data];
          setScrapList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setScrapList(allData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return <MyScrapView scrapList={scrapList} isLoading={isLoading} />;
};

export default MyScrapContainer;
