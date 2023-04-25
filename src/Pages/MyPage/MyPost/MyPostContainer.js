import React, { useState, useEffect } from "react";
import axios from "axios";
import MyPostsView from "./MyPostView";
import { setTokenHeaders } from '../../api/apiGetTokenHeader';


const MyPostContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = setTokenHeaders();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = []
        let data = []
        let pageSize = 10;
        let pageNumber = 0;
        do {
          console.log(pageNumber);
          const response = await axios.get(
            `https://bstaging.interviewbank.net/interview/me?page=${pageNumber}&size=${pageSize}`,
             {headers}
          );
          console.log(response)
          console.log(headers)
          data = response.data.interviews;
          allData = [...allData, ...data];
          setBoardList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setBoardList(allData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return <MyPostsView boardList={boardList} isLoading={isLoading}/>;
};

export default MyPostContainer;
