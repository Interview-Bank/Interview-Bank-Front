import React, { useState, useEffect } from "react";
import axios from "axios";
import MyPostsView from "./MyPostView";
import { setTokenHeaders } from '../../api/apiGetTokenHeader';


const MyPostContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const headers = setTokenHeaders();
  const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let data = [];
        let pageSize = 10;
        let pageNumber = 0;
        do {
          const response = await axios.get(
            `${InterviewBaseUrl}/me?page=${pageNumber}&size=${pageSize}`,
            { headers }
          );
          data = response.data.interviews;
          allData = [...allData, ...data];
          pageNumber++;
        } while (data.length === pageSize);
        setBoardList(allData);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, []);

  return <MyPostsView boardList={boardList} isLoading={isLoading} />;
};

export default MyPostContainer;
