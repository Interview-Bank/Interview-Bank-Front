import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyScrapView from "./MyScrapView";

const MyScrapContainer = () => {
  const [scrapList, setScrapList] = useState([]);
  const token = useSelector((state) => state.Auth.token);

  const headers = {
    "X-Auth-Token": `${token}`,
  };

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
            { headers }
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
